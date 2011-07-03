import os
import sys
from google.appengine.ext import webapp
from google.appengine.ext.webapp import util, template

from world import World

sys.path.insert(0, 'jsonpickle.zip')
import jsonpickle

class GenerateWorldHandler(webapp.RequestHandler):
    def get(self):
        world = World()
        
        jsonpickle.load_backend('django.utils.simplejson',
                                'dumps','loads',ValueError)
        self.response.out.write( jsonpickle.encode(world) )

class MostlyFalseHandler(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'mostlyfalse.html')
        self.response.out.write(template.render(path, {}))


def main():
    application = webapp.WSGIApplication([('/', MostlyFalseHandler),
                                          ('/generateworld', GenerateWorldHandler)],
                                         debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
