# RGLockHouse Catalogue

This is a simple, public catalogue site for keychain products (no pricing, no sign-in).

## Run locally (easy)

1. Open a terminal in this folder.
2. Run:

```bash
python -m http.server 8000
```

3. Open your browser to:

```
http://127.0.0.1:8000
```

## Update products (no coding required)

1. Open the helper page in your browser:

```
http://127.0.0.1:8000/update.html
```

2. Add your products and click **Download products.json**.
3. Replace the existing file at `data/products.json` on your website with the new file.
4. Refresh the main catalogue page.
