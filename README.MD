# Increment action

This action increments a digit in the specified file.

## Inputs

### `file-path`

**Optional** File containing the digit to increment. Default `"app.json"`.

### `pattern`

**Optional** RegExp pattern. Default `"versionCode": (\d+),`.

### `flags`

**Optional** RegExp flags. Default `g`.

## Outputs

### `result`

Success or failure.

## Example usage

```
- name: Checkout
  uses: actions/checkout@v2

- name: Run increment action
  uses: jb-0/increment-action
```
