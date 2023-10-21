FROM python:3.6.9
# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /pulse
WORKDIR /pulse
RUN pip install pip -U
RUN pip install gunicorn
COPY requirements.txt /pulse/
RUN pip install -r requirements.txt
COPY . /pulse/
EXPOSE 8002
RUN python manage.py collectstatic --no-input --clear
