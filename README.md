# featherweight
Ultra fast, crowd-sourced gear weights search for ultralight gear

## Features

- Instantly search over 40,000 items used (and measured) by the ultralight community
- View in grams, ounces, and pounds/ounces
- Sort columns by name or weight (click the header)
- Dark/light mode support (syncs with your operating system settings)
- Item database is cached in local storage to make page visits lightning fast

## FAQ

**Can I use this offline or locally on my computer?**

Yes! Download this repository and open `docs/index.html`. You will need to deal with CORS restrictions to load the database.
Either:

1. Using Firefox, go to `about:config` and set `privacy.file_unique_origin` to `false`. (Once the page loads once, you can change the setting back to `true`)
2. Start a local web server in the `docs` directory. This can be as simple as running the command `python3 -m http.server`.

**Are the weights accurate?**

The weights are collected from public data, and there's no guarantee the measurements are correct. However, if you see 10 measurements ranging from 110.1g and 112.2g, you can make a reasonable assumption that the correct weight is within that consensus. If you need accurate weights, please perform your own measurements.

**I have an idea or would like to contribute**

Great, this is an open source project! Feel free to use the Issues tab or fork this project.

## Shoutouts to

- [/r/ultralight](https://reddit.com/r/ultralight) for inspiration
- 'feather' by Oleksandr Panasovskyi from the Noun Project
- Sortable Tables by [HubSpot](https://github.com/hubspot/sortable)
- [new.css](https://newcss.net/), a beautiful, semantic, classless CSS framework

## Disclaimer

I do not make any claims about the accuracy of the listed measurements. This is a free service. I do not make money off this service. No animals were harmed in the making of this service. Always consult with a doctor before discontinuing use of prescribed substances. Stay hydrated. HYOH.
