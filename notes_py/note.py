import datetime
class Note:
    def __init__(self, title, body):
        self.title = title
        self.body = body
        self.createdAt = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")