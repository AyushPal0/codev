from fastapi import FastAPI

app = FastAPI()

@app.post("/suggest")
def suggest(data: dict):
    code = data["code"]

    # SIMPLE AI LOGIC (demo)
    if "for" in code:
        return {"suggestion": "Try using list comprehension for better performance"}

    if "==" in code:
        return {"suggestion": "Check if strict comparison is needed"}

    return {"suggestion": "Code looks fine"}