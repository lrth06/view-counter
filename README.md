# View Counter

![](https://github.com/lrth06/view-counter/actions/workflows/gcrdeploy.yml/badge.svg) ![](https://view-counter.tobyhagan.com/?user=lrth06/view-counter&base=30373e&accent=32c754)

## Purpose

This is a simple yet feature-rich counter that allows you to count the views of your github README files and profile page.

## Features

-   Counts the number of views of your README.md file
-   Rate limited to prevent abuse
-   Customizable
-   Stores absolutely _NO_ user data

## Usage

Usage is simple. Just add the following to your README.md file:

```
![](https://view-counter.tobyhagan.com/?user={your_github_username})
```

This will render the standard counter for your profile page.

### Multiple counters

You can also add a counter for more than just your profile page. Just add the following to your README.md file for a repository you want to track views for:

```
![](https://view-counter.tobyhagan.com/?user={your_github_username}/{your_github_repository})
```

## Customization

The counter can be customized by adding the following query parameters to the URL:

| Parameter | Description                                 | Example         |
| --------- | ------------------------------------------- | --------------- |
| `user`    | The username of the user to track views for | `user=lrth06`   |
| `base`    | The background color of the text            | `base=ff0000`   |
| `accent`  | The background color of the numbers         | `accent=00ff00` |
| `icon`    | Display an icon instead of a number         | `icon=true`     |
| `text`    | The color of the text                       | `text=000`      |
| `flat`    | Flat design (no gradients)                  | `flat=true`     |

> NOTE: Named colors may also be used, Example: text=red will render red text, if using a HEX color, be sure _NOT_ to include the #. Example: text=#ff0000 will cause an error.

Query parameters can be combined. For example, to display an icon and change the colors both sections:

```
![](https://view-counter.tobyhagan.com/?user={your_github_username}&base=ff0000&accent=3c3c3c&icon=true)
```

The above will render :

![](https://view-counter.tobyhagan.com/?base=ff0000&accent=3c3c3c&icon=true)

Whereas the following uses an alternative color scheme and uses flat design:

```
![](https://view-counter.tobyhagan.com/?user={your_github_username}&base=3c3c3c&accent=black&text=orange&flat=true)
```

and will render:

![](https://view-counter.tobyhagan.com/?base=3c3c3c&accent=black&text=orange&flat=true)
