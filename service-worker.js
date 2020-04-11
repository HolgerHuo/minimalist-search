/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/style.css"],["sou.js","6bbca81927e602f41326cbb2f26dc6ce"],["/2019/01/31/张衡星/index.html","6bbca81927e602f41326cbb2f26dc6ce"],["/2019/02/21/la-corrispondenza/index.html","1ec2e5f16574e7c2c65289a9c5ce078f"],["/2019/02/23/甘德与甘式占星/index.html","11de6a78d0e31e71b1e586bbf204d762"],["/2019/03/22/春分那些事/index.html","b42632a3ca8e1e415e38d05b5fff80f1"],["/2019/05/12/真的爱你-母亲节快乐/index.html","11520c015cb3b48e93844e175d077e71"],["/2019/05/15/psych/index.html","0974335d479ab809cae04f5d4537a8db"],["/2019/05/20/体育知识-拔河中的技巧/index.html","01191c34feadf64420c0cf2f6e0bb56a"],["/2019/05/22/灵魂摆渡人-引发的思考/index.html","4b3bc659128a3c676050d69377c5d73a"],["/2019/05/24/20/index.html","30d090e52acdb87904819117d6c9823f"],["/2019/05/26/精品应用纯纯写作，如你所愿/index.html","ffe51fa97def1a85ffd61e5dfbb6857d"],["/2019/05/30/a-thriving-society-in-china/index.html","eb1400da21497d7c7eed6961a1e627dd"],["/2019/07/07/1738/index.html","7eee232e40ae2fb0c167de5f8ea942df"],["/2019/11/08/tal-subscription-or-reward/index.html","a1c22b3d59dc1db4426a89497a526664"],["/2019/12/28/aim-writing-微软爱写作-秘塔写作猫-论文及作文的修改利器/index.html","2cef6816655f43943bcdfa508a471074"],["/2020/01/04/老薛的跨年晚会认真的雪粤语版/index.html","5a940139f9a76f8b76b91941d2c3d64c"],["/2020/02/25/l14-discussion/index.html","2f449b6571ab156b0a8f65734b03ad77"],["/2020/02/26/l15-discussion-and-etc/index.html","7526af5af1753813d08bad10d842be84"],["/2020/03/16/unlock-unit8-writing/index.html","10c33979c547fcd4157d250f4cbc2c22"],["/2020/03/31/2020天津中考资料共享/index.html","dfa496c4649634ebcea1894fe2c072f2"],["/2020/04/01/aqqle-is-now-open-source/index.html","f1605f3f4ea54dc9fa5c90e40b505082"],["/about/index.html","feed3fc39079545cb12516af402978eb"],["/amp-dist/sample/sample-avator.png","d0c9d6e58474b300006725c42f08c92a"],["/amp-dist/sample/sample-logo.png","d41d8cd98f00b204e9800998ecf8427e"],["/amp-dist/sample/sample-placeholder.png","126b89e88c33a49ad4cfbbf3d0c13f91"],["/amp-dist/sample/sample-substituteTitleImage.png","867c7aae5031d5c12f8881fe1c6480c8"],["/archives/2019/01/index.html","c21d1ec6e6a6a6a0e31b866b5dbc31ac"],["/archives/2019/02/index.html","a725bdd3bef3bc5e6e553a047d44448c"],["/archives/2019/03/index.html","58c235fbe7aecec08e9810402dc3102e"],["/archives/2019/05/index.html","794b46d6bbb8b47838f611fa02f1c1b0"],["/archives/2019/07/index.html","54177d9732460c30919d055ebe0fd4d5"],["/archives/2019/11/index.html","8fad679cc121c96e95cec296bcc2e4c8"],["/archives/2019/12/index.html","4d555abcab8ee0f4a5a0c5e7e414766c"],["/archives/2019/index.html","3b4771e853cd64ec10c42e04ed89cbc9"],["/archives/2019/page/2/index.html","2a219b1ebed2c1e92a4f6beb4ccbc365"],["/archives/2020/01/index.html","b8b6ed6735d58442d7a7409839b7a222"],["/archives/2020/02/index.html","40f7455fb27da8f7f9739c3b1189593f"],["/archives/2020/03/index.html","431d1ce49afd6a75de85070ae0d32aec"],["/archives/2020/04/index.html","18ab2ea381324e40249a399e444ddaa4"],["/archives/2020/index.html","f083d3b657d8de28b042cee90266d9f8"],["/archives/index.html","52a90c20619c291cd05d4f99955589e4"],["/archives/page/2/index.html","194c3036aef062b9c71f4d531942e4ec"],["/baidu_verify_4hmBLqQRep.html","6cb72215d1264b26f3223b7ac19735ca"],["/categories/Academic/Astronomy/index.html","d16a3b5527c146474f5656fda6032f10"],["/categories/Academic/Essay/index.html","51c1fb97b8def6c40e85ccb4f7d161ef"],["/categories/Academic/index.html","2915f97bf38b91fcd5150fe25d010250"],["/categories/Announcement/index.html","017f67613317db990eb50c26a55d71e2"],["/categories/Life/index.html","7d9e14c1d602ee0533656d80304f46a3"],["/categories/Music/index.html","7ab8302fe99551a1e611f66b17e754e4"],["/categories/Sports/index.html","93df38ed86e56acad80b6c9bc308e0fc"],["/categories/Tech/Android/index.html","a3023389843f54cecb7ee7204641df5f"],["/categories/Tech/Review/index.html","09256b95193733f14701e756ea75b716"],["/categories/Tech/index.html","9e5d65414b025161240868d34b63a7b1"],["/categories/index.html","9a443454be91039d59e372dbf964e337"],["/css/index.css","2092d71828a489cb37dd3e45e4446697"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/go/index.html","81b942d8f20c73035081aded62870140"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/avatar.png","c291715561b777d5601df42b8d8fc791"],["/img/comment_bg.png","34a79bf208a1c3bee9d6e491a00cd369"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/icp.png","6e26aed5ced63bc60524cc736611d39e"],["/img/index.jpg","dce4b2c6fe3c36d9c9e8059f64f4d506"],["/img/loading.gif","d1cf8d9ccb6a2b3514a7d14332035a3c"],["/img/post.jpg","8fb7d10986b67a1dcba885f50a5de3a9"],["/img/post_loadding.svg","2901bcb74c0f032ed139676618432304"],["/index.html","92ad5e202fb4732f4c880391ff63452e"],["/js/main.js","0cd0cf0fdb710ba9b7d96caa04c2dfaf"],["/js/search/algolia.js","d50c62e5d368a89a795f652e8600dd8f"],["/js/search/local-search.js","18b9d95b794ba47ccc3c098898bbfc04"],["/js/third-party/ClickShowText.js","22f4c82da4faed04c79e61fcbbdf675c"],["/js/third-party/activate-power-mode.js","e8455f75769585811cd6b3220787d08e"],["/js/third-party/canvas-nest.js","bb643bd9c2ac59f6ce2a1251b8014624"],["/js/third-party/canvas-ribbon.js","f91a3ea9c8a24813daf9e1e94714863a"],["/js/third-party/click_heart.js","c2420dfec66aa5bad663e6c365a129c8"],["/js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["/js/third-party/piao.js","6df6ba5f90c4dff026fc3eea73933e8b"],["/js/tw_cn.js","de2abf47a3e2ff88c167a78a3256a0cd"],["/js/utils.js","23b2d649db443d85eb9f99bd0aea196b"],["/links/index.html","e5989f0b11c24c19bf5cd160d5e80da2"],["/page/2/index.html","4c4982f23b10ae34fa39f95cbfc8bec1"],["/posts/1738/amp/index.html","3b3856c1b79c7ef29f28ad3f1c1f426d"],["/posts/1738/index.html","a759af3fc9d5a380cc2895fbffe3deee"],["/posts/20/amp/index.html","ce52bc54a19325486ec77cfeb7681085"],["/posts/20/index.html","f8acd7a35da345aad60c6ff71750018d"],["/posts/2020天津中考资料共享/amp/index.html","b7965ca2ceebdad151dd7eaa1d000f1e"],["/posts/2020天津中考资料共享/index.html","35e06bc5dae3051cc2b613a193e73fca"],["/posts/a-thriving-society-in-china/amp/index.html","69bc8abfb27a499c1768f610fbe81e51"],["/posts/a-thriving-society-in-china/index.html","1db24cc71ab139cd398c2fdbccdf806f"],["/posts/aim-writing-微软爱写作-秘塔写作猫-论文及作文的修改利器/amp/index.html","ff24bc3ec0542e8fad3d58606c0c587f"],["/posts/aim-writing-微软爱写作-秘塔写作猫-论文及作文的修改利器/index.html","fa9caa785e76de97b1ca2fea8838ced4"],["/posts/aqqle-is-now-open-source/amp/index.html","553c15c99caeaa9ea45b306a76cec8ea"],["/posts/aqqle-is-now-open-source/index.html","32cbcd464a5d094895e800074e5b840e"],["/posts/l14-discussion/amp/index.html","ab0caea029e587a213765ee37b273ed1"],["/posts/l14-discussion/index.html","50c7ec3f5a5d3d00ae392a1ca7cc5b51"],["/posts/l15-discussion-and-etc/amp/index.html","eccd3cd146884dadd96e13ec6cab4c8a"],["/posts/l15-discussion-and-etc/index.html","5e0ae00b63396ff6b51d30fc25146490"],["/posts/psych/amp/index.html","9757b562201705b4fccd26b880cfd008"],["/posts/psych/index.html","6653b7634f5ea7a56913a36458f4d532"],["/posts/tal-subscription-or-reward/amp/index.html","dedada7c095b077e83ca582047807895"],["/posts/tal-subscription-or-reward/index.html","c41cb0640e7cc43c37c2ac5efad019d2"],["/posts/unlock-unit8-writing/amp/index.html","e7ae833396a62fac0497f796cb23a974"],["/posts/unlock-unit8-writing/index.html","6cdc0e9c8c8291232fa67494ae1f9533"],["/posts/体育知识-拔河中的技巧/amp/index.html","97fe7a2a3911f7f44b815d9b4a4a4507"],["/posts/体育知识-拔河中的技巧/index.html","b4f7508827c6792b51f07e9f8c013451"],["/posts/张衡星/amp/index.html","059c2fc71c8a0db745ff984187ba6c33"],["/posts/张衡星/index.html","513e9550e70a6120a94ea02a8a1714ed"],["/posts/春分那些事/amp/index.html","d724fbdb9bd389b37346c090cdfd6ffe"],["/posts/春分那些事/index.html","40f090a8eebdace581c420f0304db036"],["/posts/灵魂摆渡人-引发的思考/amp/index.html","e8d3bf14d16d9d96062b82788cda9be4"],["/posts/灵魂摆渡人-引发的思考/index.html","da85d49c6c43da9ac1aee1f6b6c0eedd"],["/posts/甘德与甘式占星/amp/index.html","ad489dba53c173339089b60ff1847fd7"],["/posts/甘德与甘式占星/index.html","23873e7289f496d8512b8ff2f07b1f88"],["/posts/真的爱你-母亲节快乐/amp/index.html","8532233a7463ec13bac9807fc59e1606"],["/posts/真的爱你-母亲节快乐/index.html","e6a965ef130195317aec0bc0b3dbcfb9"],["/posts/精品应用纯纯写作，如你所愿/amp/index.html","aa33787b62eb68ce7e8352456cc2d72e"],["/posts/精品应用纯纯写作，如你所愿/index.html","03a40b6866347f9cc4701e692c77bf93"],["/posts/老薛的跨年晚会认真的雪粤语版/amp/index.html","0186ed11d61f0cabff6ba21fc7bf4685"],["/posts/老薛的跨年晚会认真的雪粤语版/index.html","4d32a905c5416faa17795504d9a7b824"],["/redirect.html","81b942d8f20c73035081aded62870140"],["/static/images/avatar.png","8a880b1f9bf060e80eaf55af49d4bebd"],["/static/images/server/android-chrome-192x192.png","0a3a31ad29b4dcbd7f5b57b3eb45e736"],["/static/images/server/android-chrome-512x512.png","13e7867bf26086a2a6d584b034ec66a1"],["/static/images/server/apple-touch-icon-114x114.png","a199574917b012406038833816a6f7f3"],["/static/images/server/apple-touch-icon-120x120.png","67274157350998fd04c309031491acbb"],["/static/images/server/apple-touch-icon-144x144.png","cf68e6d9fbe2827cdf862fdd72987e91"],["/static/images/server/apple-touch-icon-152x152.png","285f197fe0eb36775e153a3663782ff0"],["/static/images/server/apple-touch-icon-180x180.png","781ae94b648e436249238829255ef838"],["/static/images/server/apple-touch-icon-57x57.png","04797f45860a61f921ee142f1cd84cc3"],["/static/images/server/apple-touch-icon-60x60.png","adbfd54d587d98e953c60915b85307cd"],["/static/images/server/apple-touch-icon-72x72.png","c43fb07d43a9e0ebb2def8cfb9f1b890"],["/static/images/server/apple-touch-icon-76x76.png","1ee59df083120c08f3b2ec99c75511e6"],["/static/images/server/apple-touch-icon.png","781ae94b648e436249238829255ef838"],["/static/images/server/avatar.png","8a880b1f9bf060e80eaf55af49d4bebd"],["/static/images/server/favicon-16x16.png","425a225414cae952288a352ff280c0c8"],["/static/images/server/favicon-32x32.png","5d798876c632d6f3ef5420febe753eef"],["/static/images/server/icon-128x128.png","f766a9b41a8cf6fc4aa6372f99c0c31b"],["/static/images/server/icon-144x144.png","15a403767cf8e2202110e1a3fd779720"],["/static/images/server/icon-152x152.png","334a5f3828211fbc9171482b71417d39"],["/static/images/server/icon-192x192.png","1ad923389b8e79600e42d4cb747b4569"],["/static/images/server/icon-384x384.png","ac378aed21d817c3c2f8cac127185bd2"],["/static/images/server/icon-512x512.png","1185f7d1f9aec2f9c2f175895dcbb05a"],["/static/images/server/icon-72x72.png","54d0c838653030873bb707a56b843442"],["/static/images/server/icon-96x96.png","9c1954f47dbb32ae48ba71fe8f37eed1"],["/static/images/server/loading.gif","6ab6e3b2cbfeffec0ff3a0b4468b23c3"],["/static/images/server/mstile-144x144.png","4cd3809c1b460d9633182bc7ff41f2c4"],["/static/images/server/mstile-150x150.png","f9119142e02fc74cf7dcf42efba47252"],["/static/images/server/safari-pinned-tab.svg","6aeab7562d2a661eccddb003c34f75ea"],["/static/images/server/splash_screen.gif","f3c02dccd6e5ad388def4866b1b1b76d"],["/static/images/server/title.png","e7b210d3d1b2fb8693c65c575fa92723"],["/tags/2019-nCov/index.html","1ffd14ef54036a6c88763833792da1a0"],["/tags/2020跨年晚会/index.html","2bdcee3e06a2e961302528b3507716e1"],["/tags/AI/index.html","e631d1cb5d78a1c53a7adae4a309d3fe"],["/tags/Android/index.html","465d2a795dd682834315b1ba6ea34fa4"],["/tags/App/index.html","14cee426137c4d1be5d73ce5347a94b8"],["/tags/April-Fool-s-Day/index.html","4cb2df01b21c69d9c26abfe773d8e8f3"],["/tags/COVID-19/index.html","da63a8f96e24f8737c09b25e940432c9"],["/tags/COVID-2019/index.html","5e0d0a95b3af31cbdb94879e52d8f2cf"],["/tags/GitHub/index.html","7aa4573f41423ad842fc58c35866ecd9"],["/tags/Markdown/index.html","6150524b015da752eb4604d186541988"],["/tags/Material-Design/index.html","fac03057309cd89a4d1a3cf395ff19d8"],["/tags/Mojave/index.html","6809d76b9612a0c3f257b775038ec5f3"],["/tags/Notes/index.html","03668b9ee51aad080514aeddeb181cdd"],["/tags/Psych/index.html","41a2e828a48be10dcee189d405aa00e1"],["/tags/Pure-Writer/index.html","1c7446150d0a07287b6a18cf2d47b080"],["/tags/Senior-High-Entrance-Examination/index.html","f3fa8a8795192eb23b489b2cac3fcd94"],["/tags/academic/index.html","4c6db04cf4d9008cdc49406ec5a909ba"],["/tags/advice/index.html","e86bb440d0507a81edc0b403a414d561"],["/tags/aqqle/index.html","9562a24c0bfd8d619f6c9e8bf8ed92c9"],["/tags/collaboration/index.html","8154ac2855a699eeedbb3ba91be3e6e0"],["/tags/comparison/index.html","3da3e875f8930ef76983ea953245e4bb"],["/tags/education/index.html","afc01a1e8029accc2545af977aa2cc33"],["/tags/index.html","c90b01ba78fc1983839caf9bb6ce3d48"],["/tags/learning/index.html","d21c2e0d7076708cf3cd53f165641538"],["/tags/macOS/index.html","76eb7d8a4d3eb95d61cf798cea91680d"],["/tags/movies/index.html","388d4dc275693094dd093d29707458a4"],["/tags/open-source/index.html","1886ba666b9e8692490f74d14d193e36"],["/tags/os/index.html","6980a2a9ae37326ec5bf5d61103e762c"],["/tags/review/index.html","264a49054b70f8aae18bb958c16a3af7"],["/tags/statistics/index.html","cea3ad0f1b19904f50c7818a029a58ce"],["/tags/tal/index.html","47a2bdb2c78f7a4aca41900c5e01a631"],["/tags/team-management/index.html","68c64410814959547be7d268a9fb500f"],["/tags/tech/index.html","5722427e88c6369e4f8884e6335f0d48"],["/tags/thesis/index.html","52c2dd2c144831a338b61cc3f2085e26"],["/tags/unlock/index.html","fa5f584770d9a1ce58d37eb3ac990768"],["/tags/写作/index.html","74cf4260dad9b4608630eb301f36fd1e"],["/tags/安卓/index.html","805ab6833782d25581a8cfb6869e7921"],["/tags/安卓应用/index.html","6c17c52fb1f522465c70e6dcbfb70559"],["/tags/应用/index.html","99cc962385cd029b30f8881c71f18ebc"],["/tags/手机/index.html","6768445a6b7ae1515e2e1be47545d091"],["/tags/无言之美/index.html","fb44c0b2b12a426af8f1cae1c3118337"],["/tags/灵异妙探/index.html","75f5b990ba7ea9c2722519279c59125b"],["/tags/精品应用/index.html","ba4bc34cbd18a6d8899d17c57e71cc82"],["/tags/纯纯写作/index.html","1e9eeb9289753d1e4675fa9a05e6bf8d"],["/tags/绿色应用/index.html","9d377bda390353ddd2fe5c92e1c228b5"],["/tags/薛之谦/index.html","04a1bcb9fc573e2df5f3659a6c5e11fc"],["/tags/诗词/index.html","a8e1cee1bb4b32f6d02e7d928b450279"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







