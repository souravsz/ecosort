(function(){
const INK='#1e3319', O='2.5px solid '+INK;
const a=(st)=>Object.assign({position:'absolute',boxSizing:'border-box'},st);
function bin(h,c,s,locked){
  s=s||1; const col=locked?'#c4c8bd':c;
  return h('div',{style:{position:'relative',width:34*s,height:42*s,flex:'none'}},
    h('div',{style:a({left:'50%',top:0,width:12*s,height:6*s,marginLeft:-6*s,border:'2px solid '+INK,borderBottom:'none',borderRadius:'4px 4px 0 0'})}),
    h('div',{style:a({left:0,right:0,top:5*s,height:7*s,background:col,border:'2px solid '+INK,borderRadius:3*s})}),
    h('div',{style:a({left:3*s,right:3*s,top:11*s,bottom:0,background:col,border:'2px solid '+INK,borderTop:'none',borderRadius:'0 0 '+6*s+'px '+6*s+'px',display:'flex',justifyContent:'center',gap:6*s,paddingTop:5*s})},
      h('span',{style:{width:2.5*s,height:'58%',background:'rgba(255,255,255,.55)',borderRadius:2}}),
      h('span',{style:{width:2.5*s,height:'58%',background:'rgba(255,255,255,.55)',borderRadius:2}})));
}
const art={
  roti:h=>[h('div',{key:0,style:a({left:5,top:5,width:70,height:70,borderRadius:'50%',background:'#e8b86b',border:O})}),
    ...[[24,22],[46,18],[30,42],[52,44],[40,58],[18,50],[58,30]].map(([x,y],k)=>h('div',{key:'d'+k,style:a({left:x,top:y,width:7,height:6,borderRadius:'50%',background:'#a86a2e'})}))],
  bottle:h=>[h('div',{key:0,style:a({left:30,top:2,width:20,height:11,background:'#3f6fa8',border:O,borderRadius:3})}),
    h('div',{key:1,style:a({left:22,top:11,width:36,height:66,background:'#d6e6f4',border:O,borderRadius:'14px 14px 8px 8px'})}),
    h('div',{key:2,style:a({left:22,top:38,width:36,height:16,background:'#3f6fa8',border:O})}),
    h('div',{key:3,style:a({left:30,top:20,width:4,height:14,background:'#fff',borderRadius:2})})],
  paper:h=>[h('div',{key:0,style:a({left:6,top:12,width:68,height:56,background:'#f6f4ec',border:O,borderRadius:4,transform:'rotate(-6deg)'})},
    h('div',{style:a({left:7,top:7,width:48,height:8,background:INK,borderRadius:2})}),
    h('div',{style:a({left:7,top:22,width:22,height:3,background:'#9aa293'})}),
    h('div',{style:a({left:7,top:30,width:22,height:3,background:'#9aa293'})}),
    h('div',{style:a({left:7,top:38,width:22,height:3,background:'#9aa293'})}),
    h('div',{style:a({left:34,top:21,width:22,height:22,background:'#c9dcae',border:'1.5px solid '+INK})}))],
  banana:h=>[h('div',{key:0,style:a({left:8,top:24,width:64,height:30,background:'#f2c94c',border:O,borderRadius:'8px 8px 40px 40px / 8px 8px 30px 30px',transform:'rotate(-14deg)'})}),
    h('div',{key:1,style:a({left:8,top:34,width:9,height:9,background:'#7a5230',borderRadius:3})}),
    h('div',{key:2,style:a({left:64,top:18,width:9,height:9,background:'#7a5230',borderRadius:3})})],
  apple:h=>[h('div',{key:0,style:a({left:38,top:5,width:5,height:16,background:'#7a5230',borderRadius:2})}),
    h('div',{key:1,style:a({left:43,top:7,width:18,height:10,background:'#4a7a2c',border:'2px solid '+INK,borderRadius:'0 100% 0 100%'})}),
    h('div',{key:2,style:a({left:11,top:18,width:58,height:56,background:'#d9534f',border:O,borderRadius:'50% 50% 46% 46%'})}),
    h('div',{key:3,style:a({left:22,top:30,width:10,height:10,background:'rgba(255,255,255,.6)',borderRadius:'50%'})})],
  tissue:h=>[h('div',{key:0,style:a({left:26,top:14,width:28,height:28,background:'#fff',border:O,borderRadius:4,transform:'rotate(45deg)'})}),
    h('div',{key:1,style:a({left:8,top:34,width:64,height:38,background:'#f2d6df',border:O,borderRadius:7})}),
    h('div',{key:2,style:a({left:26,top:40,width:28,height:6,background:'#c0456b',borderRadius:3})})],
  battery:h=>[h('div',{key:0,style:a({left:33,top:4,width:14,height:10,background:INK,borderRadius:2})}),
    h('div',{key:1,style:a({left:22,top:12,width:36,height:64,background:'#d08a1e',border:O,borderRadius:7,overflow:'hidden'})},
      h('div',{style:a({left:0,right:0,bottom:0,height:'45%',background:INK})})),
    h('div',{key:2,style:a({left:36,top:24,width:8,height:16,background:'#fff',borderRadius:2,clipPath:'polygon(60% 0,0 60%,45% 60%,35% 100%,100% 40%,55% 40%)'})})]
};
function item(h,k,s){s=s||1;return h('div',{style:{position:'relative',width:80,height:80,transform:'scale('+s+')'}},...(art[k]?art[k](h):[]));}
function heart(h,on,k){return h('svg',{key:k,width:22,height:22,viewBox:'0 0 24 24',fill:on?'#c0456b':'none',stroke:INK,strokeWidth:2,strokeLinejoin:'round',style:{opacity:on?1:.35,transition:'all .2s'}},h('path',{d:'M12 20s-7-4.4-9.2-8.8A5.2 5.2 0 0 1 12 6.4a5.2 5.2 0 0 1 9.2 4.8C19 15.6 12 20 12 20z'}));}
function lock(h){return h('svg',{width:13,height:13,viewBox:'0 0 24 24',fill:'none',stroke:'#7a7f74',strokeWidth:2.6,strokeLinecap:'round'},h('rect',{x:5,y:11,width:14,height:10,rx:2}),h('path',{d:'M8 11V8a4 4 0 0 1 8 0v3'}));}
function bucket(h,c,name,locked,s){
  s=s||1; const k=v=>v*s, mini=s<.7, col=locked?'#bfc2b8':c, trap='polygon(0 0,100% 0,91% 100%,9% 100%)', bw=mini?2:2.5;
  return h('div',{style:{position:'relative',width:k(104),height:k(128),flex:'none'}},
    h('div',{style:a({left:k(27),top:0,width:k(50),height:k(24),border:(mini?2:3)+'px solid '+INK,borderBottom:'none',borderRadius:k(30)+'px '+k(30)+'px 0 0'})}),
    h('div',{style:a({left:k(2),top:k(16),width:k(100),height:k(16),background:col,border:bw+'px solid '+INK,borderRadius:k(6),zIndex:2})},
      h('div',{style:a({left:0,right:0,bottom:0,height:'45%',background:'rgba(0,0,0,.18)'})})),
    h('div',{style:a({left:k(8),top:k(30),width:k(88),height:k(98),background:INK,clipPath:trap})}),
    h('div',{style:a({left:k(8)+bw,top:k(30),width:k(88)-2*bw,height:k(98)-bw,background:col,clipPath:trap})},
      h('div',{style:a({left:0,right:0,top:0,height:k(10),background:'rgba(0,0,0,.14)'})}),
      h('div',{style:a({left:k(18),top:k(70),width:k(4),height:k(16),background:'rgba(255,255,255,.4)',borderRadius:2})}),
      h('div',{style:a({right:k(18),top:k(70),width:k(4),height:k(16),background:'rgba(255,255,255,.4)',borderRadius:2})})),
    h('div',{style:a({left:mini?-3:s<1?k(2):14,right:mini?-3:s<1?k(2):14,top:k(48),minHeight:mini?20:k(30),zIndex:3,background:'#fbf8f0',border:(mini?1.5:2)+'px solid '+INK,borderRadius:mini?4:5,display:'grid',placeItems:'center',padding:mini?'1px 2px':'2px 4px',whiteSpace:'nowrap',
      fontFamily:"'Fredoka',sans-serif",fontSize:mini?10.5:s<1?(name.length>7?11:13):name.length>7?12:15,fontWeight:700,lineHeight:1.05,textAlign:'center',color:locked?'#7a7f74':INK})},name));
}
function plant(h,st){
  const G='#5f9a3a',L='#8cbf5a',B='2px solid '+INK;
  const stem=(ht,w)=>h('div',{key:'s',style:a({left:'50%',bottom:0,width:w,marginLeft:-w/2,height:ht,background:G,border:B,borderRadius:3})});
  const leaf=(side,y,s,k)=>h('div',{key:k,style:a({left:side<0?'auto':'calc(50% + 2px)',right:side<0?'calc(50% + 2px)':'auto',bottom:y,width:18*s,height:10*s,background:L,border:B,
    borderRadius:side<0?'100% 0 100% 0':'0 100% 0 100%',transform:`rotate(${side<0?18:-18}deg)`,transformOrigin:side<0?'right bottom':'left bottom'})});
  const ball=(l,b,d,c,k)=>h('div',{key:k,style:a({left:`calc(50% + ${l}px)`,bottom:b,width:d,height:d,borderRadius:'50%',background:c,border:B})});
  let kids=[];
  if(st===0) kids=[h('div',{key:0,style:a({left:'50%',bottom:-3,width:16,height:10,marginLeft:-8,background:'#7a5230',border:B,borderRadius:'50%'})})];
  if(st===1) kids=[stem(24,6),leaf(-1,16,1,1),leaf(1,20,1,2)];
  if(st===2) kids=[stem(50,7),leaf(-1,14,1.1,1),leaf(1,24,1.1,2),leaf(-1,34,1,3),leaf(1,42,.9,4)];
  if(st===3) kids=[stem(58,7),leaf(-1,14,1.1,1),leaf(1,26,1.1,2),
    ...[[-7,66],[7,66],[-11,54],[11,54],[0,46]].map(([x,y],k)=>ball(x-8,y-6,16,'#e58aa8','p'+k)),ball(-7,56,14,'#f2c94c','c')];
  if(st===4) kids=[h('div',{key:'t',style:a({left:'50%',bottom:0,width:14,marginLeft:-7,height:46,background:'#8a5a34',border:B,borderRadius:3})}),
    ball(-40,34,44,G,1),ball(-4,34,44,G,2),ball(-28,56,56,L,3)];
  return h('div',{style:{position:'relative',width:96,height:116}},...kids);
}
window.EcoArt={bin,item,heart,lock,bucket,plant};
})();
