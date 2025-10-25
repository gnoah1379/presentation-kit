FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libreoffice \
        poppler-utils \
        fonts-dejavu \
        fonts-liberation \
        libxrender1 \
        libxext6 \
        ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies
RUN pip install --no-cache-dir \
        pillow \
        python-pptx

# Copy repo into image
WORKDIR /app
COPY /scripts/ /app




