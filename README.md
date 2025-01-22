# PickUp - one stop virtual queueing platform for smoother pickup sessions for courts around campus

side feature: shows where the games are happening on campus too and how busy it is

focus (mvp):
oscar: apple/google auth
srikar: database for user

1.queue
2.court profiles

potential late stage features:

- stats/MMR
- custom player profiles

## Backend setup

1. Create a virtual environment using python -m venv <env_name>
2. source <env_name>/bin/activate
3. pip install -r requirements.txt
4. Create a .env file with the contents SUPABASE_KEY=<supabase_key> and SUPABASE_URL=<supabase_url>
5. cd into backend and run python app.py
