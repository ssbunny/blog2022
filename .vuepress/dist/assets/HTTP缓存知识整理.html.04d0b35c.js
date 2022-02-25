import{i as t}from"./app.1ea428fb.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";var o="/assets/http_cache.431cf871.jpg";const a={},r=t('<h1 id="http-\u7F13\u5B58\u77E5\u8BC6\u6574\u7406" tabindex="-1"><a class="header-anchor" href="#http-\u7F13\u5B58\u77E5\u8BC6\u6574\u7406" aria-hidden="true">#</a> HTTP \u7F13\u5B58\u77E5\u8BC6\u6574\u7406</h1><p>\u505A\u4E00\u4E0B HTTP \u7F13\u5B58\u76F8\u5173\u77E5\u8BC6\u70B9\u7684\u603B\u7ED3\u3002</p><h2 id="_1-\u7F13\u5B58\u547D\u4E2D" tabindex="-1"><a class="header-anchor" href="#_1-\u7F13\u5B58\u547D\u4E2D" aria-hidden="true">#</a> 1. \u7F13\u5B58\u547D\u4E2D</h2><p>\u5173\u4E8E\u547D\u4E2D\u7684\u6982\u5FF5\u5982\u4E0B\uFF1A</p><ul><li><strong>\u7F13\u5B58\u547D\u4E2D\uFF08cache hit\uFF09</strong> \u7528\u5DF2\u6709\u7684\u526F\u672C\u4E3A\u67D0\u4E9B\u5230\u8FBE\u7F13\u5B58\u7684\u8BF7\u6C42\u63D0\u4F9B\u670D\u52A1\u3002</li><li><strong>\u7F13\u5B58\u672A\u547D\u4E2D\uFF08cache miss\uFF09</strong> \u4E00\u4E9B\u5230\u8FBE\u7F13\u5B58\u7684\u8BF7\u6C42\u7531\u4E8E\u6CA1\u6709\u526F\u672C\u53EF\u7528\uFF0C\u800C\u88AB\u8F6C\u53D1\u7ED9\u539F\u59CB\u670D\u52A1\u5668\u3002</li><li><strong>\u518D\u9A8C\u8BC1\uFF08revalidation\uFF09</strong> \u539F\u59CB\u670D\u52A1\u5668\u7684\u5185\u5BB9\u53EF\u80FD\u53D1\u751F\u53D8\u5316\uFF0C\u7F13\u5B58\u8981\u4E0D\u65F6\u68C0\u6D4B\u5176\u526F\u672C\u662F\u5426\u662F\u670D\u52A1\u5668\u4E0A\u6700\u65B0\u7684\u526F\u672C\u3002</li><li><strong>\u518D\u9A8C\u8BC1\u547D\u4E2D/\u7F13\u6162\u547D\u4E2D\uFF08revalidation hit / slow hit\uFF09</strong> \u7F13\u5B58\u5BF9\u5176\u526F\u672C\u8FDB\u884C\u518D\u9A8C\u8BC1\u65F6\uFF0C \u4F1A\u5411\u539F\u59CB\u670D\u52A1\u5668\u53D1\u8D77\u4E00\u4E2A\u5C0F\u7684\u518D\u9A8C\u8BC1\u8BF7\u6C42\uFF0C\u5982\u679C\u670D\u52A1\u5668\u8FD4\u56DE304\u7F13\u5B58\u518D\u6B21\u5C06\u526F\u672C\u6807\u8BC6\u4E3A\u65B0\u9C9C\u7684\u3002 \u7F13\u6162\u547D\u4E2D\u8981\u6BD4\u7F13\u5B58\u547D\u4E2D\u6162\uFF0C\u6BD4\u7F13\u5B58\u672A\u547D\u4E2D\u5FEB\u3002</li></ul><p>\u8003\u91CF\u547D\u4E2D\u7387\u4E3B\u8981\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A</p><ul><li><strong>\u7F13\u5B58\u547D\u4E2D\u7387</strong> \u7531\u7F13\u5B58\u63D0\u4F9B\u670D\u52A1\u7684\u8BF7\u6C42\u6240\u5360\u7684\u6BD4\u4F8B\u3002\u5BF9\u73B0\u5728\u4E2D\u7B49\u89C4\u6A21\u7684\u7F13\u5B58\uFF0C40%\u7684\u547D\u4E2D\u7387\u662F\u5408\u7406\u7684\u3002</li><li><strong>\u5B57\u8282\u547D\u4E2D\u7387</strong> \u7F13\u5B58\u63D0\u4F9B\u7684\u5B57\u8282\u5728\u4F20\u8F93\u7684\u6240\u6709\u5B57\u8282\u4E2D\u6240\u5360\u7684\u6BD4\u4F8B\u3002</li></ul><h2 id="_2-\u5904\u7406\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#_2-\u5904\u7406\u8FC7\u7A0B" aria-hidden="true">#</a> 2. \u5904\u7406\u8FC7\u7A0B</h2><p><img src="'+o+`" alt="IMAGE"></p><h2 id="_3-\u518D\u9A8C\u8BC1" tabindex="-1"><a class="header-anchor" href="#_3-\u518D\u9A8C\u8BC1" aria-hidden="true">#</a> 3. \u518D\u9A8C\u8BC1</h2><p>\u76F8\u5173\u7684 5 \u4E2A\u6761\u4EF6\u9996\u90E8\uFF1A</p><ul><li><code>If-Modified-Since</code> \uFF1A\u901A\u8FC7\u6BD4\u8F83\u8FC7\u671F\u65E5\u671F\u8FDB\u884C\u518D\u9A8C\u8BC1\u3002</li><li><code>If-None-Match</code> \uFF1A\u901A\u8FC7\u6BD4\u8F83\u5B9E\u4F53\u6807\u7B7E(ETag)\u8FDB\u884C\u518D\u9A8C\u8BC1\u3002</li><li><code>If-Unmodified-Since</code> \uFF1A\u5728\u8FDB\u884C\u90E8\u5206\u6587\u4EF6\u7684\u4F20\u8F93\u65F6\uFF0C\u83B7\u53D6\u6587\u4EF6\u7684\u5176\u4F59\u90E8\u5206\u4E4B\u524D\u7528\u6765\u786E\u4FDD\u6587\u4EF6\u672A\u53D1\u751F\u53D8\u5316\u3002</li><li><code>If-Range</code> \uFF1A\u652F\u6301\u5BF9\u4E0D\u5B8C\u6574\u6587\u6863\u7684\u7F13\u5B58\u3002</li><li><code>If-Match</code> \uFF1A\u7528\u4E8E\u4E0EWeb\u670D\u52A1\u5668\u6253\u4EA4\u9053\u65F6\u7684\u5E76\u53D1\u63A7\u5236\u3002</li></ul><p>IMS\u8BF7\u6C42\uFF1A<code>If-Modified-Since</code> \u518D\u9A8C\u8BC1\u8BF7\u6C42\u3002\u53EA\u6709\u81EA\u67D0\u4E2A\u65E5\u671F\u4E4B\u540E\u8D44\u6E90\u53D1\u751F\u4E86\u53D8\u5316\u7684\u65F6\u5019\uFF0CIMS\u8BF7\u6C42\u624D\u4F1A\u6267\u884C\uFF1A\u8FD4\u56DE\u65B0\u6587\u6863\u7ED9\u7F13\u5B58\u6216304\uFF0C\u4EE5\u53CA\u65B0\u7684\u8FC7\u671F\u65E5\u671F\u3002\u6709\u4E9BWeb\u670D\u52A1\u5668\u53EA\u662F\u5C06IMS\u65E5\u671F\u548C\u6587\u6863\u6700\u540E\u4FEE\u6539\u65E5\u671F\u8FDB\u884C\u5B57\u7B26\u4E32\u6BD4\u8F83\u3002</p><p>\u5F3A\u5F31\u9A8C\u8BC1\u5668\uFF1A\u53EA\u8981\u5185\u5BB9\u53D1\u751F\u53D8\u5316\uFF0C\u5F3A\u9A8C\u8BC1\u5668\u5C31\u4F1A\u53D8\u5316\uFF1B\u5185\u5BB9\u7684\u4E3B\u8981\u542B\u4E49\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u5F31\u9A8C\u8BC1\u5668\u4F1A\u53D8\u5316\u3002\u670D\u52A1\u5668\u4F1A\u7528 <code>W/</code> \u524D\u7F00\u6765\u6807\u8BC6\u5F31\u9A8C\u8BC1\u5668\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ETag: W/&quot;v2.6&quot;
If-None-Match: W/&quot;v2.6&quot;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>\u5982\u679C\u670D\u52A1\u5668\u56DE\u9001\u4E86\u4E00\u4E2A <code>ETag</code> \uFF0CHTTP1.1\u5BA2\u6237\u7AEF\u5C31\u5FC5\u987B\u4F7F\u7528\u5B9E\u4F53\u6807\u7B7E\u9A8C\u8BC1\u5668\u3002\u5982\u679C\u670D\u52A1\u5668\u53EA\u56DE\u9001\u4E00\u4E2A <code>Last-Modified</code> \u503C\uFF0C\u5BA2\u6237\u7AEF\u5C31\u53EF\u4EE5\u4F7F\u7528 <code>If-Modified-Since</code> \u9A8C\u8BC1\u3002\u5982\u679C\u4E24\u79CD\u65B9\u5F0F\u90FD\u63D0\u4F9B\uFF0C\u5BA2\u6237\u7AEF\u5E94\u8BE5\u4F7F\u7528\u4E24\u79CD\u518D\u9A8C\u8BC1\u65B9\u5F0F\u3002</p><h2 id="_4-\u63A7\u5236\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#_4-\u63A7\u5236\u7F13\u5B58" aria-hidden="true">#</a> 4. \u63A7\u5236\u7F13\u5B58</h2><ul><li><strong>Cache-Control: no-store</strong> \uFF1A\u7981\u6B62\u7F13\u5B58\u5BF9\u54CD\u5E94\u8FDB\u884C\u590D\u5236\u3002\u7F13\u5B58\u4F1A\u50CF\u975E\u7F13\u5B58\u4EE3\u7406\u670D\u52A1\u5668\u4E00\u6837\uFF0C\u50CF\u5BA2\u6237\u7AEF\u53D1\u9001\u4E00\u6761 no-store \u54CD\u5E94\uFF0C\u7136\u540E\u5220\u9664\u5BF9\u8C61\u3002</li><li><strong>Cache-Control: no-cache</strong> \uFF1A\u54CD\u5E94\u53EF\u4EE5\u5B58\u50A8\u5728\u672C\u5730\u7F13\u5B58\u533A\u4E2D\u3002\u53EA\u662F\u5728\u4E0E\u539F\u59CB\u670D\u52A1\u5668\u8FDB\u884C\u65B0\u9C9C\u5EA6\u518D\u9A8C\u8BC1\u4E4B\u524D\uFF0C\u7F13\u5B58\u4E0D\u80FD\u5C06\u5176\u63D0\u4F9B\u7ED9\u5BA2\u6237\u7AEF\u4F7F\u7528\u3002</li><li><strong>Pragma: no-cache</strong> \uFF1A\u517C\u5BB9HTTP1.0+</li><li><strong>Cache-Control: max-age</strong> \uFF1A\u4ECE\u670D\u52A1\u5668\u5C06\u6587\u6863\u4F20\u6765\u4E4B\u65F6\u8D77\uFF0C\u53EF\u4EE5\u8BA4\u4E3A\u6B64\u6587\u6863\u5904\u4E8E\u65B0\u9C9C\u72B6\u6001\u7684\u79D2\u6570\u3002 <code>s-maxage</code> \u8868\u793A\u4EC5\u9002\u7528\u4E8E\u516C\u6709\u7F13\u5B58\u3002\u670D\u52A1\u5668\u53EF\u4EE5\u5C06\u6700\u5927\u4F7F\u7528\u671F\u8BBE\u7F6E\u4E3A 0 \uFF0C\u4ECE\u800C\u5728\u6BCF\u6B21\u8BBF\u95EE\u65F6\u90FD\u5237\u65B0\u3002 Cache-Control: max-age=3600 Cache-Control: s-maxage=3600</li><li><strong>Expires</strong> \uFF1A(\u4E0D\u63A8\u8350\u4F7F\u7528) \u6307\u5B9A\u5B9E\u9645\u7684\u8FC7\u671F\u65E5\u671F\u3002HTTP\u8BBE\u8BA1\u8005\u540E\u6765\u8BA4\u4E3A\u670D\u52A1\u5668\u65F6\u949F\u4E0D\u540C\u6B65\u6216\u4E0D\u6B63\u786E\uFF0C \u6240\u4EE5\u6700\u597D\u8FD8\u662F\u4F7F\u7528\u5269\u4F59\u79D2\u6570\u6765\u8868\u793A\u8FC7\u671F\u65F6\u95F4\u3002</li><li><strong>Cache-Control: must-revalidate</strong> \uFF1A\u7F13\u5B58\u5728\u4E8B\u5148\u6CA1\u6709\u8DDF\u539F\u59CB\u670D\u52A1\u5668\u8FDB\u884C\u518D\u9A8C\u8BC1\u7684\u60C5\u51B5\u4E0B\uFF0C \u4E0D\u80FD\u63D0\u4F9B\u5BF9\u8C61\u7684\u9648\u65E7\u526F\u672C\u3002\u5982\u679C\u7F13\u5B58\u8FDB\u884C\u65B0\u9C9C\u5EA6\u68C0\u67E5\u65F6\u539F\u59CB\u670D\u52A1\u5668\u4E0D\u53EF\u7528\uFF0C\u7F13\u5B58\u5FC5\u987B\u8FD4\u56DE504\u9519\u8BEF\u3002</li><li><strong>\u8BD5\u63A2\u6027\u8FC7\u671F</strong> \uFF1A\u7F13\u5B58\u53EF\u4EE5\u8BA1\u7B97\u51FA\u4E00\u4E2A\u8BD5\u63A2\u6027\u6700\u5927\u4F7F\u7528\u671F\u3002<em>LM-Factor\u7B97\u6CD5</em></li></ul><p><strong>\u9644\u8868\uFF1A Cache-Control</strong></p><table><thead><tr><th>\u6307\u4EE4</th><th>\u76EE\u7684</th></tr></thead><tbody><tr><td>Cache-Control: max-stale</td><td>\u7F13\u5B58\u53EF\u4EE5\u968F\u610F\u63D0\u4F9B\u8FC7\u671F\u6587\u4EF6(\u653E\u677E\u7F13\u5B58\u89C4\u5219)</td></tr><tr><td>Cache-Control: max-stale=s</td><td>\u5728\u65F6\u95F4 s \u79D2\u5185\uFF0C\u6587\u6863\u4E0D\u80FD\u8FC7\u671F</td></tr><tr><td>Cache-Control: min-fresh=s</td><td>\u81F3\u5C11\u5728\u672A\u6765 s \u79D2\u5185\u6587\u6863\u8981\u4FDD\u6301\u65B0\u9C9C(\u4E25\u683C\u89C4\u5219)</td></tr><tr><td>Cache-Control: max-age=s</td><td>\u7F13\u5B58\u65E0\u6CD5\u8FD4\u56DE\u7F13\u5B58\u65F6\u95F4\u957F\u4E8E s \u79D2\u7684\u6587\u6863(\u4E25\u683C\u89C4\u5219)</td></tr><tr><td>Cache-Control: no-cache</td><td>\u9664\u975E\u8D44\u6E90\u8FDB\u884C\u4E86\u518D\u9A8C\u8BC1\uFF0C\u5426\u5219\u5BA2\u6237\u7AEF\u4E0D\u63A5\u53D7\u5DF2\u7F13\u5B58\u7684\u8D44\u6E90</td></tr><tr><td>Pragma: no-cache</td><td>HTTP/1.0+ \u540C\u4E0A</td></tr><tr><td>Cache-Control: no-store</td><td>\u7F13\u5B58\u5E94\u8BE5\u5C3D\u5FEB\u4ECE\u5B58\u50A8\u5668\u4E2D\u5220\u9664\u6587\u6863\u7684\u6240\u6709\u75D5\u8FF9</td></tr><tr><td>Cache-Control: only-if-cached</td><td>\u53EA\u6709\u5F53\u7F13\u5B58\u4E2D\u6709\u526F\u672C\u5B58\u5728\u65F6\uFF0C\u5BA2\u6237\u7AEF\u624D\u4F1A\u83B7\u53D6\u4E00\u4EFD\u526F\u672C</td></tr></tbody></table><p><em>\u4E3B\u8981\u53C2\u8003\u8D44\u6599\uFF1A\u300AHTTP\u6743\u5A01\u6307\u5357\u300B</em></p>`,21);function d(n,i){return r}var l=e(a,[["render",d]]);export{l as default};
