***  Whereabouts dev server ***
___________________________________
___________________________________
Requirements:
Flask (https://flask.palletsprojects.com/en/1.1.x/installation/#installation)

python-twitter (https://python-twitter.readthedocs.io/en/latest/)

To use (Windows):
	1. Enter PowerShell or Command Prompt within the directory of the script.
	2. For Powershell: enter ```PS C:\path\to\app> $env:FLASK_APP = "example.py"```
	3. For Command Prompt: enter ```C:\path\to\app>set FLASK_APP=example.py ```
	4. enter python -m flask run --host=0.0.0.0
	5. open your localhost or any ip address assigned to your computer.

For other OS versions, refer to the quickstart guide here:https://flask.palletsprojects.com/en/1.1.x/quickstart/


______
There are examples of urls to try within the source code, but keep in mind a header is needed for the calls to work.

For all current requests, the headers must have these(in order):
	consumer-key
	consumer-secret-key
	access-token
	access-secret-token

You can find your keys and tokens on your twitter dev page.
Currently, the server only handles returning statuses from RAW SEARCH QUERIES and screennames for friends.
The twitter screen name for the user in question must be used for get_friends to work.
For /get_tweets, the raw search query has to be formed and sent to the server beforehand.
Both cases will return a json file for easy parsing.
______