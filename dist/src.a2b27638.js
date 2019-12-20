// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"config/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userInput = exports.selectElement = exports.CONTROLS = exports.URL = void 0;
var URL = {
  GET_POSTS: "https://jsonplaceholder.typicode.com/posts?userId=",
  GET_USERS: "https://jsonplaceholder.typicode.com/users/",
  GET_PHOTOS: "https://jsonplaceholder.typicode.com/photos/",
  GOOGLE_MAPS: "https://maps.google.com/?ll=",
  USER_PROFILE_IMG: "https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png"
};
exports.URL = URL;
var CONTROLS = {
  USER_SEARCHBAR_VALUE: "#userSearchBar",
  COMMENTS_DISPLAY_BTN: ".BtnComments"
};
exports.CONTROLS = CONTROLS;

var selectElement = function selectElement(queryText) {
  return document.querySelector(queryText);
};

exports.selectElement = selectElement;
var userInput = selectElement(CONTROLS.USER_SEARCHBAR_VALUE);
exports.userInput = userInput;
},{}],"template/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateUser = templateUser;
exports.templatePost = templatePost;
exports.templatePhoto = templatePhoto;

var _config = require("../config/config.js");

function templateUser(userInfo) {
  var markup = "\n  <div class=\"content content__post--border\">\n    <div class=\"content__userinfo\">\n      <div class=\"userinfo__avatar userinfo--centered\">\n        <img src=".concat(_config.URL.USER_PROFILE_IMG, " width=\"100px\" alt=\"\">\n      </div>\n      <div class=\"userinfo__item1 userinfo--centered\">\n        <ul class=\" userinfo__list\">\n          <li class=\"userinfo__list--blue\">").concat(userInfo.username, "</li>\n          <li class=\"userinfo__list--grey\">").concat(userInfo.address.city, "</li>\n          <li class=\"userinfo__list--grey\">").concat(userInfo.company.name, "</li>\n        </ul>\n      </div>         \n      <div class=\"userinfo__item2 userinfo--centered\">\n        <ul class=\" userinfo__list\">\n          <li class=\"userinfo__list--blue userinfo__li--wide\">").concat(userInfo.email, "</li>\n          <li class=\"userinfo__list--grey userinfo__li--wide\"><a href=\"").concat(_config.URL.GOOGLE_MAPS).concat(userInfo.address.geo.lat, ",").concat(userInfo.address.geo.lng, "\">google mass link</a></li>\n          <li class=\"userinfo__list--grey userinfo__li--wide\">").concat(userInfo.website, "</li>\n        </ul>\n      </div>\n    </div>");
  (0, _config.selectElement)("#user__content").insertAdjacentHTML("afterBegin", markup);
}

function templatePost(postInfo, index) {
  var markup = "\n         <div class=\"content__post content__post--border content--centered\">\n            <p ><span class=\"post__text--blue\">".concat(postInfo[index].title, "</span></p>\n            <p><span class=\"post__text--grey\">").concat(postInfo[index].body, "</span></p>\n          </div>\n          <button class=\"BtnComments\">Show comments...</button>\n        </div>\n  ");
  (0, _config.selectElement)(".content").insertAdjacentHTML("beforeEnd", markup);
}

function templatePhoto(photoInfo) {
  var markup = "\n           <div class=\"content__picture content--centered\">\n               <img  src=\"".concat(photoInfo.url, "\" alt=\"\"> \n           </div>\n  ");
  (0, _config.selectElement)(".content").insertAdjacentHTML("beforeEnd", markup);
}
},{"../config/config.js":"config/config.js"}],"View/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayPosts = displayPosts;
exports.removePosts = removePosts;

var _template = require("../template/template.js");

var _config = require("../config/config.js");

function displayPosts(userInfo, postInfo, photoInfo, index) {
  (0, _template.templateUser)(userInfo);
  (0, _template.templatePhoto)(photoInfo);
  (0, _template.templatePost)(postInfo, index);
}

function removePosts() {
  var parentElement = (0, _config.selectElement)("#user__content");

  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
},{"../template/template.js":"template/template.js","../config/config.js":"config/config.js"}],"main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPage = renderPage;

var _config = require("./config/config.js");

var _view = require("./View/view.js");

// export function renderPage(){
//   if(event.keyCode === 13){
//     event.preventDefault(); 
//     removePosts();
//     if(userInput.value){
//       Promise.all
//       ([        
//         fetch(`${URL.GET_USERS}${userInput.value}`)
//         .then(data => data.json()),
//         fetch(`${URL.GET_POSTS}${userInput.value}`)
//         .then(data => data.json()),
//       ])
//       .then(data =>{
//         let usersData, postsData;
//         [usersData, postsData] = data;     
//         postsData.forEach((post, index) => {
//           fetch(`${URL.GET_PHOTOS}${postsData[index].id}`)
//           .then(data => data.json())
//           .then((photosData) => {   
//             displayPosts(usersData, postsData, photosData, index);   
//           }) 
//         })  
//       })
//       .catch((err) => {
//             console.log(err);
//       });      
//     }
//     else{
//       removePosts();  
//     }
//   }
// }
function renderPage() {
  if (event.keyCode === 13) {
    event.preventDefault();
    (0, _view.removePosts)();

    if (_config.userInput.value) {
      getAPIData();
    }
  }
}

function getAPIData() {
  fetch("".concat(_config.URL.GET_USERS).concat(_config.userInput.value)).then(function (data) {
    return data.json();
  }).then(function (usersData) {
    fetch("".concat(_config.URL.GET_POSTS).concat(_config.userInput.value)).then(function (data) {
      return data.json();
    }).then(function (postsData) {
      postsData.forEach(function (placeholder, index) {
        fetch("".concat(_config.URL.GET_PHOTOS).concat(postsData[index].id)).then(function (data) {
          return data.json();
        }).then(function (photosData) {
          (0, _view.displayPosts)(usersData, postsData, photosData, index);
        });
      });
    });
  });
}
},{"./config/config.js":"config/config.js","./View/view.js":"View/view.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _config = require("../config/config.js");

var _main = require("../main.js");

_config.userInput.addEventListener("keydown", function (event) {
  (0, _main.renderPage)();
});
},{"./styles.css":"src/styles.css","../config/config.js":"config/config.js","../main.js":"main.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52531" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map