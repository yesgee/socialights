/*!CK:39573285!*//*1425269043,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["4mQ3B"]); }

__d("ChatTypingIndicator.react",["ChatAuthorPhotoBlock.react","ReactComponentWithPureRenderMixin","React","cx"],function(a,b,c,d,e,f,g,h,i,j){var k=i.createClass({displayName:"ChatTypingIndicator",mixins:[h],propTypes:{userID:i.PropTypes.string,showName:i.PropTypes.bool},render:function(){var l=this.props,m=l.userID,n=l.showName;return (i.createElement(g,{authorID:m,className:(("_gfq")+(n?' '+"_52fu":'')),hideName:!n},i.createElement("div",{className:"_52ft"},i.createElement("div",{className:"_gfp",ref:"bubble"}))));},getBubble:function(){return this.refs.bubble;}});e.exports=k;},null);
__d("ChatTypingIndicators.react",["ChatTypingIndicator.react","DOM","MercuryIDs","MercuryParticipants","React","SubscriptionsHandler","Tooltip","MercuryTypingReceiver","arraySort","createObjectFrom","cx","emptyFunction","fbt","joinClasses","MercuryThreadInformer"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u=b('MercuryThreadInformer').get(),v=k.createClass({displayName:"ChatTypingIndicators",propTypes:{indicatorClass:k.PropTypes.func,indicatorsWillShow:k.PropTypes.func,indicatorsDidShow:k.PropTypes.func,rootClassName:k.PropTypes.string,threadID:k.PropTypes.string.isRequired},getDefaultProps:function(){return {indicatorClass:g,indicatorsWillShow:r,indicatorsDidShow:r};},getInitialState:function(){return {typingUserIDs:[]};},componentDidMount:function(){this._subscriptions=new l();this._subscriptions.addSubscriptions(n.addRetroactiveListener('state-changed',this.typingStateChanged),u.subscribe('messages-received',this.messagesReceived));},componentWillReceiveProps:function(w){if(w.threadID!=this.props.threadID)this.setState({typingUserIDs:[]});},componentWillUpdate:function(w,x){if(x.typingUserIDs.length>0)this.props.indicatorsWillShow();},componentDidUpdate:function(){if(this.state.typingUserIDs.length>0)this.props.indicatorsDidShow();j.getMulti(this.state.typingUserIDs,function(w){if(this.isMounted())this.state.typingUserIDs.forEach(function(x){var y=w[x],z=this.refs[x].getBubble();if(z)m.set(z.getDOMNode(),this.renderTooltip(y.short_name),'above','left');}.bind(this));}.bind(this));},componentWillUnmount:function(){this._subscriptions.release();},render:function(){var w=i.isMultichat(this.props.threadID);return (k.createElement("div",{className:t(this.props.rootClassName,"_2fsr")},this.state.typingUserIDs.map(function(x){return this._renderTypingIndicator(x,!!w);}.bind(this))));},_renderTypingIndicator:function(w,x){var y=this.props.indicatorClass;return (k.createElement(y,{key:w,ref:w,showName:x,userID:w}));},renderTooltip:function(w){var x=h.create('span');k.render(k.createElement("span",null,s._("{name} is typing...",[s.param("name",w)])),x);return x;},typingStateChanged:function(w){if(this.props.threadID in w)this.setState({typingUserIDs:o(w[this.props.threadID])});},messagesReceived:function(w,x){if(this.props.threadID in x){var y=x[this.props.threadID],z=p(y.map(function(aa){return aa.author;}));this.setState({typingUserIDs:o(this.state.typingUserIDs.filter(function(aa){return !z[aa];}))});}}});e.exports=v;},null);
__d("MercurySpoofWarning.react",["MercuryParticipants","React","fbt"],function(a,b,c,d,e,f,g,h,i){var j=h,k=j.PropTypes,l=h.createClass({displayName:"MercurySpoofWarning",propTypes:{authorID:k.string.isRequired},getInitialState:function(){return {author:{name:''}};},componentWillMount:function(){this.componentWillReceiveProps(this.props);},componentWillReceiveProps:function(m){g.get(m.authorID,function(n){return this.setState({author:n});}.bind(this));},render:function(){return (h.createElement("div",h.__spread({},this.props),i._("Unable to confirm {name_or_email} as the sender.",[i.param("name_or_email",this.state.author.name)])));}});e.exports=l;},null);
__d("MercuryTypingAnimation.react",["React","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i){'use strict';var j=g.createClass({displayName:"MercuryTypingAnimation",propTypes:{color:g.PropTypes.oneOf(['light','dark'])},getDefaultProps:function(){return {color:'dark'};},render:function(){var k=(("_4a0v")+(this.props.color==='light'?' '+"_4a0w":'')+(this.props.color==='dark'?' '+"_4a0x":''));return (g.createElement("div",{className:i(this.props.className,k)},g.createElement("div",{className:"_4b0g"},g.createElement("div",{className:"_4a0y"}),g.createElement("div",{className:"_4a0y"}),g.createElement("div",{className:"_4a0y"}))));}});e.exports=j;},null);
__d("MercuryTypingIndicator",["Animation","Bootloader","BootloadedComponent.react","ChatConfig","CSS","DOM","MercuryTypingReceiver","MercuryViewer","MercuryParticipants","React","Style","ChatTabTemplates","Tooltip","copyProperties","csx","cx","emptyFunction","fbt","MercuryThreadInformer"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x){var y=b('MercuryThreadInformer').get(),z=[];if(!j.get('webspeed_chatbootloadmanager'))h.loadModules(["MercuryTypingAnimation.react"],w);y.subscribe('messages-received',function(ca,da){z.forEach(function(ea){var fa=da[ea._threadID];fa&&ea.receivedMessages(fa);});});m.addRetroactiveListener('state-changed',function(ca){z.forEach(function(da){var ea=ca[da._threadID];ea&&da._handleStateChanged(ea);});});function aa(ca){var da=r[':fb:chat:conversation:message-group'].build(),ea=r[':fb:mercury:typing-indicator:typing'].build();k.addClass(da.getRoot(),"_50kd");var fa=da.getNode('profileLink');s.set(fa,ca.name,'left');fa.href=ca.href;da.setNodeContent('profileName',ca.name);da.setNodeProperty('profilePhoto','src',ca.image_src);var ga=x._("{name} is typing...",[x.param("name",ca.short_name)]);s.set(ea.getRoot(),ga,'above');l.appendContent(da.getNode('messages'),ea.getRoot());return da;}function ba(ca,da,ea){this._animations={};this._activeUsers={};this._typingIndicator=da;this._messagesView=ea;this._threadID=ca;this._subscription=m.addRetroactiveListener('state-changed',function(fa){var ga=fa[this._threadID];ga&&this._handleStateChanged(ga);}.bind(this));z.push(this);}t(ba.prototype,{destroy:function(){Object.keys(this._activeUsers).forEach(this._removeUserBubble.bind(this));this._controller.destroy();z.remove(this);},receivedMessages:function(ca){ca.forEach(function(da){if(!n.isViewer(da.author))this._removeUserBubble(da.author);}.bind(this));},_handleStateChanged:function(ca){for(var da in this._activeUsers)if(ca.indexOf(da)===-1){this._slideOutUserBubble(da);delete this._activeUsers[da];}if(ca.length)o.getMulti(ca,function(ea){var fa=this._messagesView.isScrolledToBottom(),ga={};for(var ha in ea){var ia=this._activeUsers[ha];ga[ha]=ia||aa(ea[ha]).getRoot();if(!ia){l.appendContent(this._typingIndicator,ga[ha]);if(j.get('chat_thread_typing_indicator_animated')){var ja=l.scry(this._typingIndicator,"._510u");for(var ka=0,la=ja.length;ka<la;ka++)p.render(p.createElement(i,{bootloadPlaceholder:p.createElement("span",null),bootloadComponent:function(na){h.loadModules(["MercuryTypingAnimation.react"],na);},className:"_3e2s"}),ja[ka]);}}}var ma=Object.keys(ga).length>0;fa&&this._messagesView.scrollToBottom(ma);this._activeUsers=ga;}.bind(this));},_removeUserBubble:function(ca,da){var ea=this._getCurrentAnimation(ca,da);if(ea){ea.animation.stop();l.remove(ea.elem);delete this._animations[ca];}if(ca in this._activeUsers){l.remove(this._activeUsers[ca]);delete this._activeUsers[ca];}if(da&&j.get('chat_thread_typing_indicator_animated')){var fa=l.scry(da,"._510u");for(var ga=0,ha=fa.length;ga<ha;ga++)p.unmountComponentAtNode(fa[ga]);}da&&l.remove(da);},_slideOutUserBubble:function(ca){var da=this._activeUsers[ca];if(this._getCurrentAnimation(ca,da)){return;}else if(da){q.set(da,'overflow','hidden');var ea=(new g(da)).from('opacity',1).from('height',da.offsetHeight).to('height',0).to('opacity',0).ease(g.ease.end).duration(250).ondone(this._removeUserBubble.bind(this,ca,da)).go();this._animations[ca]={animation:ea,elem:da};}},_getCurrentAnimation:function(ca,da){if(this._animations[ca]&&(!da||this._animations[ca].elem===da))return this._animations[ca];}});e.exports=ba;},null);