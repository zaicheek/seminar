## GOOGLE CALENDAR API

# link to calendar: https://calendar.google.com/calendar?cid=cGVvMHVoNThta2k2OW9wNTg3ZmtsNWt2dmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ

# install info here: https://developers.google.com/calendar/quickstart/python
# install api: pip install --upgrade google-api-python-client oauth2client

# setup anaconda3

# conda create --name py3vision
# source activate py3vision
# python calendar.py


# some notes: this clears the entire calendar and re-builds it from scratch each time
# we could set it up not to add events in the past, which would speed things up a bit



from __future__ import print_function
import datetime
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools
import json
import dateutil.parser
from dateutil.relativedelta import relativedelta

cID = 'peo0uh58mki69op587fkl5kvvg@group.calendar.google.com'
# If modifying these scopes, delete the file token.json.
SCOPES = 'https://www.googleapis.com/auth/calendar'

def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    store = file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = build('calendar', 'v3', http=creds.authorize(Http()))

    # Call the Calendar API
    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    print('Getting future events')
    events_result = service.events().list(calendarId=cID, timeMin=now,
                                        maxResults=50, singleEvents=True,
                                        orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        print('No upcoming events found.')
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(start, event['summary'])

    # clear calendar
    print('Clearing future events')

    for event in events:
      service.events().delete(calendarId=cID,eventId=event['id']).execute()
      print('Removing event: ' + event['id'])

    # load data
    with open('./events.js','r') as efile:
      data = efile.read()
      data = data[data.find('['):data.rfind(']')+1]
      localEvents = json.loads(data)

    for levent in localEvents:
      date = dateutil.parser.parse(levent['date'])

      if date >= (datetime.datetime.now() - datetime.timedelta(days=1)):
        print('Adding event: ' + levent['author'])
        if 'time' in levent.keys():
          timestr = levent['time']
          time = timestr[:timestr.find(',')]
          loc = timestr[timestr.find(',')+2:]

          start = dateutil.parser.parse(levent['date'] + ' ' + time)
          end = start + relativedelta(hours=1,minutes=30)
          # start = date + relativedelta()
        else:
          start = date + relativedelta(hours=9,minutes=30)
          end = date + relativedelta(hours=11) 
          loc = 'Jordan Hall, 420-419'

        event = {
          'summary': levent['author'] + ': ' + levent['title'],
          'location': loc,
          'description': levent['abstract'],
          'start': {
            'dateTime': start.isoformat(),
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': end.isoformat(),
            'timeZone': 'America/Los_Angeles',
          }
        }
        service.events().insert(calendarId=cID,body=event).execute()

if __name__ == '__main__':
    main()