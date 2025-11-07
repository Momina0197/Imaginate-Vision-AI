from fastapi import FastAPI
import uvicorn
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World", "status": "working"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"✅ Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port)