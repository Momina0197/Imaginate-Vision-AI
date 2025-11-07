

# from fastapi import FastAPI, File, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# from fastapi.requests import Request
# import os
# import base64
# import requests
# from dotenv import load_dotenv
# from PIL import Image
# from io import BytesIO

# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "https://imaginate-vision-ai.vercel.app",
#         "http://localhost:3000",  
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load environment variables
# load_dotenv()
# SEGMIND_API_KEY = os.getenv("SEGMIND_API_KEY")
# print("Loaded API KEY:", os.getenv("SEGMIND_API_KEY")) 
# if not SEGMIND_API_KEY:
#     raise Exception("SEGMIND_API_KEY not loaded correctly.")



# # Mount static directory to serve edited images
# if not os.path.exists("static"):
#     os.makedirs("static")
# app.mount("/static", StaticFiles(directory="static"), name="static")


# def resize_image(image_file: UploadFile, dimension: str, width: int = None, height: int = None) -> BytesIO:
#     image = Image.open(image_file.file).convert("RGB")

#     if dimension == "landscape":
#         resized = image.resize((1024, 768))
#     elif dimension == "portrait":
#         resized = image.resize((768, 1024))
#     elif dimension == "custom" and width and height:
#         resized = image.resize((width, height))
#     else:
#         resized = image 

#     output_buffer = BytesIO()
#     resized.save(output_buffer, format="PNG")
#     output_buffer.seek(0)
#     return output_buffer


# @app.post("/edit-image/")
# async def edit_image(
#     request: Request,
#     image: UploadFile = File(...),
#     prompt: str = Form(...),
#     dimension: str = Form("landscape")
# ):
#     print("=== REQUEST RECEIVED ===")
#     print(f"Method: {request.method}")
#     print(f"Headers: {dict(request.headers)}")
#     print(f"Client: {request.client}")
#     print(f"Prompt: {prompt}")
#     print(f"Image filename: {image.filename}")

#     if SEGMIND_API_KEY is None:
#         return {"error": "API key is missing. Please set SEGMIND_API_KEY in .env"}

#     if dimension == "portrait":
#         width, height = 512, 768
#     elif dimension == "square":
#         width, height = 640, 640
#     else:  # default to landscape
#         width, height = 768, 512
#     resized_image_io = resize_image(image, dimension, width, height)
#     image_base64 = base64.b64encode(resized_image_io.read()).decode("utf-8")

#     url = "https://api.segmind.com/v1/ominicontrol"
#     headers = {"x-api-key": SEGMIND_API_KEY}


#     data = {
#         "image": image_base64,
#         "prompt": prompt,
#         "steps": 8,
#         "seed": 4710825087,
#         "image_format": "png",
#         "image_quality": 90,
#         "base64": True,
#         # "width": width,
#         # "height": height
#     }
#     response = requests.post(url, json=data, headers=headers)

#     print("Prompt:", prompt)
#     print("API key used:", SEGMIND_API_KEY)
#     print("Base64 image starts with:", image_base64[:30])
#     print("Sending payload:", data)
#     print("Response:", response.text)


#     if response.status_code == 200:
#         response_json = response.json()
#         output_image_base64 = response_json.get("image")

#         if output_image_base64:
#             safe_filename = f"output_{image.filename.replace(' ', '_')}"
#             output_path = os.path.join("static", safe_filename)

#             with open(output_path, "wb") as img_file:
#                 img_file.write(base64.b64decode(output_image_base64))

#             return {
#                 "message": "Image edited and saved successfully",
#                 "image_url": f"{request.base_url}static/{safe_filename}"
#             }
#         else:
#             return {"error": "Invalid response from API. No image found."}
#     else:
#         return {"error": response.json()}
    
# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 8080))
#     uvicorn.run(app, host="0.0.0.0", port=port)



from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import base64
import requests
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
import tempfile
import uvicorn
import traceback

# Load environment variables first
load_dotenv()

app = FastAPI(title="Imaginate Vision AI")

# CORS - Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoints
@app.get("/")
async def root():
    return {
        "status": "healthy", 
        "message": "Imaginate Vision AI Backend is running",
        "service": "FastAPI"
    }

@app.get("/health")
async def health():
    return {"status": "ok", "service": "Imaginate Vision AI"}

@app.get("/test")
async def test():
    return {"message": "Test successful - API is working"}

# Simple file test endpoint
@app.post("/simple-upload")
async def simple_upload(
    image: UploadFile = File(...),
    prompt: str = Form(...)
):
    try:
        return {
            "message": "File received successfully",
            "filename": image.filename,
            "prompt": prompt,
            "content_type": image.content_type
        }
    except Exception as e:
        return {"error": str(e)}

# Your main endpoint (simplified for now)
@app.post("/edit-image/")
async def edit_image(
    image: UploadFile = File(...),
    prompt: str = Form(...),
    dimension: str = Form("landscape")
):
    try:
        # Validate inputs
        if not prompt.strip():
            raise HTTPException(status_code=400, detail="Prompt is required")
        
        # Read the image file
        image_data = await image.read()
        
        return {
            "message": "Image processing started",
            "prompt": prompt,
            "dimension": dimension,
            "file_size": len(image_data),
            "status": "success"
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Processing error: {str(e)}"}
        )

# Railway startup
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"🚀 Starting server on port {port}")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        access_log=True
    )