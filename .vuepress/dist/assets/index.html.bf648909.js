const e={key:"v-8e57e500",path:"/notes/migrate/coding-extjs-lifecycle/",title:"ExtJS \u6838\u5FC3\u6982\u5FF5 - \u7EC4\u4EF6\u7684\u751F\u547D\u5468\u671F",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"\u521D\u59CB\u5316",slug:"\u521D\u59CB\u5316",children:[{level:3,title:"1. \u914D\u7F6E\u5E94\u7528",slug:"_1-\u914D\u7F6E\u5E94\u7528",children:[]},{level:3,title:"2. \u6CE8\u518C\u4E8B\u4EF6",slug:"_2-\u6CE8\u518C\u4E8B\u4EF6",children:[]},{level:3,title:"3. \u751F\u6210ID",slug:"_3-\u751F\u6210id",children:[]},{level:3,title:"4. \u5B9E\u4F8B\u5316\u63D2\u4EF6",slug:"_4-\u5B9E\u4F8B\u5316\u63D2\u4EF6",children:[]},{level:3,title:"5. initComponent",slug:"_5-initcomponent",children:[]},{level:3,title:"6. \u7EC4\u4EF6\u6CE8\u518C\u5230 ComponentManager \u4E2D",slug:"_6-\u7EC4\u4EF6\u6CE8\u518C\u5230-componentmanager-\u4E2D",children:[]},{level:3,title:"7. \u589E\u52A0 observable \u548C state",slug:"_7-\u589E\u52A0-observable-\u548C-state",children:[]},{level:3,title:"8. \u6CE8\u518C\u72B6\u6001\u4E8B\u4EF6 resize",slug:"_8-\u6CE8\u518C\u72B6\u6001\u4E8B\u4EF6-resize",children:[]},{level:3,title:"9. \u521D\u59CB\u5316\u63D2\u4EF6",slug:"_9-\u521D\u59CB\u5316\u63D2\u4EF6",children:[]},{level:3,title:"10. \u5904\u7406 ComponentLoader",slug:"_10-\u5904\u7406-componentloader",children:[]},{level:3,title:"11. \u8FDB\u5165\u6E32\u67D3\u9636\u6BB5",slug:"_11-\u8FDB\u5165\u6E32\u67D3\u9636\u6BB5",children:[]}]},{level:2,title:"\u6E32\u67D3",slug:"\u6E32\u67D3",children:[{level:3,title:"1. \u89E6\u53D1 beforerender",slug:"_1-\u89E6\u53D1-beforerender",children:[]},{level:3,title:"2. \u7F13\u5B58",slug:"_2-\u7F13\u5B58",children:[]},{level:3,title:"3. \u5904\u7406\u6D6E\u52A8",slug:"_3-\u5904\u7406\u6D6E\u52A8",children:[]},{level:3,title:"4. \u8BBE\u7F6E\u5BB9\u5668",slug:"_4-\u8BBE\u7F6E\u5BB9\u5668",children:[]},{level:3,title:"5. onRender",slug:"_5-onrender",children:[]},{level:3,title:"6. \u8BBE\u7F6E hideMode \u548C overCls",slug:"_6-\u8BBE\u7F6E-hidemode-\u548C-overcls",children:[]},{level:3,title:"7. \u89E6\u53D1 render",slug:"_7-\u89E6\u53D1-render",children:[]},{level:3,title:"8. afterRender",slug:"_8-afterrender",children:[]},{level:3,title:"9. \u89E6\u53D1 afterrender",slug:"_9-\u89E6\u53D1-afterrender",children:[]},{level:3,title:"10. \u8BBE\u7F6E hidden",slug:"_10-\u8BBE\u7F6E-hidden",children:[]}]},{level:2,title:"\u9500\u6BC1",slug:"\u9500\u6BC1",children:[{level:3,title:"1. \u89E6\u53D1 beforedestroy",slug:"_1-\u89E6\u53D1-beforedestroy",children:[]},{level:3,title:"2. beforeDestroy",slug:"_2-beforedestroy",children:[]},{level:3,title:"3. \u6CE8\u9500\u6D6E\u52A8",slug:"_3-\u6CE8\u9500\u6D6E\u52A8",children:[]},{level:3,title:"4. \u4ECE\u7236\u5BB9\u5668\u4E2D\u5220\u9664",slug:"_4-\u4ECE\u7236\u5BB9\u5668\u4E2D\u5220\u9664",children:[]},{level:3,title:"5. onDestroy",slug:"_5-ondestroy",children:[]},{level:3,title:"6. \u9500\u6BC1\u63D2\u4EF6",slug:"_6-\u9500\u6BC1\u63D2\u4EF6",children:[]},{level:3,title:"7. \u89E3\u9664 HTML \u4E8B\u4EF6\u7ED1\u5B9A\u5E76\u9500\u6BC1\u5143\u7D20",slug:"_7-\u89E3\u9664-html-\u4E8B\u4EF6\u7ED1\u5B9A\u5E76\u9500\u6BC1\u5143\u7D20",children:[]},{level:3,title:"8. \u89E6\u53D1 destroy",slug:"_8-\u89E6\u53D1-destroy",children:[]},{level:3,title:"9. \u4ECE ComponentManager \u4E2D\u6CE8\u9500\u7EC4\u4EF6",slug:"_9-\u4ECE-componentmanager-\u4E2D\u6CE8\u9500\u7EC4\u4EF6",children:[]},{level:3,title:"10. \u89E3\u9664\u4E8B\u4EF6\u7ED1\u5B9A",slug:"_10-\u89E3\u9664\u4E8B\u4EF6\u7ED1\u5B9A",children:[]}]},{level:2,title:"\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F",slug:"\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F",children:[]},{level:2,title:"\u6A21\u677F\u65B9\u6CD5 OR \u4E8B\u4EF6\uFF1F",slug:"\u6A21\u677F\u65B9\u6CD5-or-\u4E8B\u4EF6",children:[]}],git:{updatedTime:1644290356e3,contributors:[{name:"ssbunny",email:"qqbunny@yeah.net",commits:1}]},filePathRelative:"notes/migrate/coding-extjs-lifecycle/README.md"};export{e as data};
