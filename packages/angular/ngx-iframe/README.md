# Goals

Library goal is to support and standardize approach to micro front-end's, where we want to have a shell application that consists of header, navigation etc. and multiple different applications (micro front-end's) accessed through single iframe that control rest of the space.

Also, assumption is that specific micro front-end will be displayed dependent on matching regex url.

# Features

-   Automatic changing of iframe url to different micro front-end's when url changes.
-   Automatic routes synchronization between shell and micro front-end applications.
-   Directive microIframe that manages displaying micro front-end's in an iframe.
-   Service to manage iframe behavior and communication with micro front-ends.
