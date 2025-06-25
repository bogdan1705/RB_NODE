# Habit Tracker CLI

## Installation

1. Install dependencies:

```bash
  npm install
```

## Usage

Run the application using:

```bash
  node src/index.js [command] [options]
```

### Available Commands

```bash
  node src/index.js add --name "Run" --freq "daily"
```

```bash
  node src/index.js add --name "Read" --freq "weekly"
  ```

```bash
  node src/index.js add --name "Work" --freq "monthly"
```

```bash  
  node src/index.js list
```

```bash 
  node src/index.js markDone --id 1749653783005
```

```bash  
  node src/index.js update --id 1749653783005 --name "Run"
 ```

```bash 
  node src/index.js update --id 1749653783005 --freq "weekly"
 ```

```bash 
  node src/index.js update --id 1749653783005 --name "Run" --freq "daily"
 ```

```bash 
  node src/index.js delete --id 1749653783005
 ```

```bash 
  node src/index.js stats --period 7
 ```

```bash 
  node src/index.js stats --period 30
```

## Examples

```bash
  node src/index.js add --name "Read" --freq "daily"
  node src/index.js add --name "Read" --freq "weekly"

  node src/index.js list
  node src/index.js done --id 1
  node src/index.js stats --period 7
```
## Environment variables

DATE_OFFSET - for offset current date
