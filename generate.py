import os
import json

IMAGE_EXTENSIONS = (".jpg", ".jpeg", ".png", ".webp", ".gif")

catalog = {}

for brand in os.listdir("."):

```
if not os.path.isdir(brand):
    continue

if brand.startswith("."):
    continue

models = {}

for model in os.listdir(brand):

    model_path = os.path.join(brand, model)

    if not os.path.isdir(model_path):
        continue

    images = []

    for file in os.listdir(model_path):

        if file.lower().endswith(IMAGE_EXTENSIONS):

            full_path = f"/{brand}/{model}/{file}"

            modified_time = os.path.getmtime(
                os.path.join(model_path, file)
            )

            images.append({
                "path": full_path,
                "time": modified_time
            })

    images.sort(
        key=lambda x: x["time"],
        reverse=True
    )

    image_paths = [img["path"] for img in images]

    if image_paths:
        models[model] = image_paths

if models:

    first_model = next(iter(models))

    catalog[brand] = {
        "cover": models[first_model][0],
        "models": models
    }
```

with open(
"brands.json",
"w",
encoding="utf-8"
) as f:

```
json.dump(
    catalog,
    f,
    ensure_ascii=False,
    indent=2
)
```

print("brands.json generated successfully")
