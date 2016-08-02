FROM ubuntu:14.04

MAINTAINER Andrey Marchenko, igendou@gmail.com

RUN mkdir /home/app

WORKDIR /home/app

ADD . .

# Do basic updates
RUN apt-get update -q && apt-get clean

# Get curl in order to download meteor
RUN apt-get install curl -y \
  # Install Meteor
  && (curl https://install.meteor.com/ | sh) \
  # Build the Meteor app
  && cd /home/app \
  && meteor build ./build --directory \

  # Install the version of Node.js we need.
  && cd /home/app/build/bundle \
  && bash -c 'curl "https://nodejs.org/dist/v4.4.7/node-v4.4.7-linux-x64.tar.gz" > /home/app/build/required-node-linux-x64.tar.gz' \
  && cd /usr/local && tar --strip-components 1 -xzf /home/app/build/required-node-linux-x64.tar.gz \
  && rm /home/app/build/required-node-linux-x64.tar.gz \

  # Build the NPM packages needed for build
  && cd /home/app/build/bundle/programs/server \
  && npm install \

  # Get rid of Meteor. We're done with it.
  && rm /usr/local/bin/meteor \
  && rm -rf ~/.meteor \

  #no longer need curl
  && apt-get --purge autoremove curl -y

RUN npm install -g forever

EXPOSE 80
ENV PORT 80

CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "build/bundle/main.js"]
