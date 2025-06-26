import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url'

export class Router {
    constructor() {
        this.staticRoutes = {};
        this.denamicRoutes = {};
    }

    async init(routesDir) {
        await this.readRoutes(routesDir, '/rest');
        console.log(this.staticRoutes);
        console.log(this.denamicRoutes);
    }

    async readRoutes(dirPath, urlPath) {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });

            const directories = entries.filter(entry => entry.isDirectory());

            const route = entries.filter(({name}) => name === 'route.js');

            route.forEach(entry => {

                if (urlPath.includes('[')) {
                    this.denamicRoutes[urlPath] = path.join(dirPath, entry.name);
                } else {
                    this.staticRoutes[urlPath] = path.join(dirPath, entry.name);
                }
            });

            await Promise.all(directories.map(entry => this.readRoutes(path.join(dirPath, entry.name), `${urlPath}/${entry.name}`)));

        } catch (error) {
            console.error(`Failed read directory ${dirPath}:`, error);
        }
    }

    async handleRequest(req, res) {
        const method = req.method || 'GET';
        const url = req.url || '';


        if (this.staticRoutes.hasOwnProperty(url)) {

            const handler = await this.getHandlerRoutes(this.staticRoutes[url], method);

            if (!handler) {
                res.writeHead(405).end(JSON.stringify({ error: 'Method not allowed' }));
                return
            }

            return this.executeRoute(handler, req, res);
        }


        const denamicRoutePath = Object.keys(this.denamicRoutes).find((routePath) => this.matchDynamic(url, routePath));

        if (denamicRoutePath) {
            const filePath = this.denamicRoutes[denamicRoutePath];

            const handler = await this.getHandlerRoutes(filePath, method);

            if (!handler) {
                res.writeHead(405).end(JSON.stringify({ error: 'Method not allowed' }));
                return
            }

            const params = this.extractParams(url, denamicRoutePath);

            req.params = params;

            return this.executeRoute(handler, req, res);
        }

        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Not Found' }));

    }

    async getHandlerRoutes(filePath, method) {

        const routeModule = await import(pathToFileURL(filePath).href);
        return routeModule[method];
    }

    matchDynamic(url, routePath) {
        const urlParts = url.split('/');
        const patternParts = routePath.split('/');

        if (urlParts.length !== patternParts.length) {
            return false;
        }

        return patternParts.every((part, i) => part.startsWith('[') || part === urlParts[i]);
    }

    extractParams(url, pattern) {
        const urlParts = url.split('/');
        const patternParts = pattern.split('/');
        const params = {};

        patternParts.forEach((part, i) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                const paramName = part.slice(1, -1);
                params[paramName] = urlParts[i];
            }
        });

        return params;
    }

    async executeRoute(handler, req, res) {

        try {
            await handler(req, res);
        } catch (error) {
            console.error('Route execution error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Server error' }));
            return true;
        }
    }
}

export default Router;
