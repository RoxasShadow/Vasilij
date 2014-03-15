Vasilij
=======
MUH gallery, MUH nodejs, MUH backbone, MUH MIT, MUH mainstream!

Let's say I needed a nice UI to manage the images stored in my server and the previous software I used is actually a bunch of shit.
And let's say, too, that someone told me I should use more mainstream languages.

What it does
------------
After you have configured `config.js`, *Vasilij* provides APIs that output a JSON response containing the directory tree of given path, making eventually thumbnails for folders which have no one.

*Improvisation* makes a grid with these infos with some wizardries and... that's it.

Feature
-------
- ROFL-Scaling
- Thumbnails
- Customizable paths, URLs and sorting order
- Image search
- Lazy loading
- Browser caching
- Grids
- ???

Usage
-----
```
$ npm   install
$ npm   install -g bower
$ bower install
$ npm   start
```

When you visit for the first time the home page of *Vasilij*, it will make a thumbnail for every image it finds.
This process can be very slow. You have also to install [ImageMagick](http://www.imagemagick.org).

[Demo](http://vasilij.giovannicapuano.net)
