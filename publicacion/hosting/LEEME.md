# Archivos fijos en la raíz del hosting

Copias de los archivos que están subidos a mano en `public_html` (Hostinger), fuera de WordPress.

| Archivo | Para qué | Subido |
|---|---|---|
| `ads.txt` | Autoriza a Google AdSense (ID de editor `pub-3264898877144491`) a vender anuncios en la web. El servidor lo entrega directamente, sin PHP ni base de datos. | 28/10/2026, con el conector de Hostinger (subida TUS) |

Si cambia el ID de AdSense, hay que cambiar este archivo y volver a subirlo, además de la opción `jm_adsense_client`. Si se borra del hosting, el tema genera `/ads.txt` con el ID guardado.
