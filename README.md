<p align="center">
  <img width="300" alt="oneuptimelogo" src="https://raw.githubusercontent.com/OneUptime/oneuptime/master/Marketing/logos/OneUptimePNG/7.png">
</p>
<p align="center">
  <a href='http://makeapullrequest.com'><img alt='PRs Welcome' src='https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=shields'/></a>
  <a href='https://join.slack.com/t/oneuptimedev/shared_invite/zt-17r8o7gkz-nITGan_PS9JYJV6WMm_TsQ'><img alt="Join Slack Community" src="https://img.shields.io/badge/slack%20community-join-blue"/></a>
  <img alt="Docker Pulls" src="https://img.shields.io/docker/pulls/oneuptime/backend"/>
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/oneuptime/app"/>
</p>

OneUptime is an open-source complete SRE and DevOps platform.

OneUptime monitors your website, dashboards, API's, and more and alerts your team when downtime happens. We also give you a Status Page which keeps your customers looped in and improves transparency.

OneUptime does:

-   Uptime Monitoring just like Pingdom
-   Status Page just like StatusPage.io
-   Incident Management just like Icident.io
-   On-call rotation and alerts just like PagerDuty
-   Tests just like Postman (Coming soon)
-   Security just like Snyk (Coming soon)
-   Logs Management just like Loggly (Coming soon)
-   Performance Monitoring just like NewRelic (Coming soon)
-   Error Tracking just like Sentry (Coming soon)

All under one platform.

## Get started for free

### OneUptime Cloud

The fastest and most reliable way to get started with OneUptime is signing up for free to [OneUptime Cloud](https://oneuptime.com). By using the hosted cloud service, you also support by funding OneUptime open source development. 

### Open-source single-server deploy with Docker Compose.

Deploy a signle-server instance in one line on Debian / Ubuntu with Docker (recommended 8GB memory, we only support Debian / Ubuntu as of today).

 ```bash 
  git clone https://github.com/OneUptime/oneuptime
  bash preinstall.sh
 ``` 

Please look at config.env and change these values, 

```
DOMAIN=oneuptime.yourcompany.com # This is used for SSL certs with letsencrypt. SSL cert will be auto-provisioned. 

# SMTP SETTINGS for sending email from OneUptime. 
SMTP_USERNAME=username
SMTP_PASSWORD=password
SMTP_PORT=465
SMTP_EMAIL=alerts@yourcompany.com
SMTP_FROM_NAME=OneUptime
SMTP_IS_SECURE=true
SMTP_HOST=smtp.yourcompany.com
```


Then, run install: 

```
bash install.sh
```

Your instance should be up and running, if that does not work. Please send an email to support@oneuptime.com.

## Philosophy

Our mission is to reduce downtime and increase the number of successful products in the world. To do that, we build a platform that help you understand causes of the downtime, incidents and help reduce toil. Our product is open-source, free and available for everyone to use. 

## Contributing

We <3 contributions big and small. In priority order (although everything is appreciated) with the most helpful first:

- Give us feedback in our [Customer Slack community](https://oneuptimesupport.slack.com/join/shared_invite/zt-1kavkds2f-gegm_wePorvwvM3M_SaoCQ#/shared-invite/email)
- Talk to developers in our [Developer Slack community](https://join.slack.com/t/oneuptimedev/shared_invite/zt-17r8o7gkz-nITGan_PS9JYJV6WMm_TsQ)
- Write tests for some of our codebase. [See issues here](https://github.com/OneUptime/oneuptime/issues?q=is%3Aopen+is%3Aissue+label%3A%22write+tests%22)
- Work on any issue you like. [See issues here](https://github.com/OneUptime/oneuptime/issues)
- Open new issues and create new feature requests that you would like to see. [Open issues here](https://github.com/OneUptime/oneuptime/issues)


# Contribute

For contribution guidelines, see [CONTRIBUTING](/CONTRIBUTING.md).
