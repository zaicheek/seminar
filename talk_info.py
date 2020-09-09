# run 'python talk_info.py'
#
# only outputs info for future events



from __future__ import print_function
import json
import dateutil.parser
import datetime
from dateutil.relativedelta import relativedelta

# load data
with open('./events.js','r') as efile:
	data = efile.read()
	data = data[data.find('['):data.rfind(']')+1]
	localEvents = json.loads(data)

for levent in localEvents:
	if levent['type']=='Talk':
		date = dateutil.parser.parse(levent['date'])

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

		if date > datetime.datetime.now():
			print('*************************')
			print('Talk Date/Time: ' + start.strftime("%A, %m/%d/%Y %H:%M%p"))
			print('Location: ' + loc)
			print('Speaker Name: ' + levent['author'])
			print('Speaker Affiliation: ' + levent['info'])
			print('Talk title: ' + levent['title'] + '\n')
			print('Abstract: ' + levent['abstract'] + '\n')
			print('Event Sponser: Vision Brunch (Psychology Department')
			print('Contact email: dbirman@stanford.edu, grotheer@stanford.edu')
			print('*************************')
