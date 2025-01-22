import os
from flask import Flask
from dotenv import load_dotenv
from supabase import create_client, Client

#load environment variables
load_dotenv()

# configure flask app
app = Flask(__name__)

#configure supabase
url: str = os.environ.get('SUPABASE_URL')
key: str = os.environ.get('SUPABASE_KEY')
supabase: Client = create_client(url, key)

@app.route('/')
def home():
    try:
        response = supabase.table("users").insert(
            {"first_name": "Srikar", 
            "last_name": "Eranky", 
            "email": "srikar.eranky@gmail.com"}
        ).execute()
        return str(response)
    except Exception as e:
        return str(e)
    

if __name__ == '__main__':
    app.run()