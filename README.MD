# Increment action

This action increments a digit in the specified file.

## Inputs

### `file-path`

**Required** File containing the digit to increment. Default `"app.json"`.

### `regex`

**Required** Pattern to find and replace. Default `/"versionCode": (\d+),/g`.

## Outputs

### `result`

Success or failure.

## Example usage

```
- name: Checkout
  uses: actions/checkout@v2
  with:
    fetch-depth: 0

- name: Run increment action
  uses: jb-0/increment-action
```
