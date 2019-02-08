Vue.component('tab-code',{
    props: ['result'],
    template: `<pre class="code" data-lang="HTML">
        <code>
            {{result}}
        </code>
    </pre>`
});
Vue.component('tab-preview', {
    props: ['result'],
    template: ' <div v-html="result"> </div>'
})

new Vue({
    el: '#app',
    data: {
        content: "",
        result: '',
        nbCol: 3,
        lineCount: 0,
        tabs: ['Code','Preview'],
        currentTab: 'Code',
        title: 'Sociétés déjà inscrites'
    },
    computed: {
        currentTabComponent: function(){
            return 'tab-'+this.currentTab.toLowerCase()
        }
    },
    
    methods:{
        getHtmlTable: function(){
           let lines =  this.content.split("\n").sort();
           var table = '<table>';
           var nbCol = this.nbCol;
           table+=`<thead><tr><th colspan="${nbCol}">${this.title}</th></tr></thead>\n`;
           table+='<tbody>'+"\n";
           lines.forEach(function(el,i,arr){
               if(i%nbCol==0){
                   table+='<tr>';
               }
               el = el.replace(/;*/ig, '');
               table+=`<td>${el}</td>`;
               if(i%nbCol==nbCol-1){
                   table+='</tr>'+"\n";
               }
               
           });
           this.lineCount = lines.length;
           if(this.linesCount%nbCol!=0){
               table+='</tr>'+"\n";
           }
           table+='</tbody></table>';           
           this.result = table;
        },
        onCopy: function(e){
            alert('text copied');
        },
        onError: function(e){
            alert('error copying the text');
        }
    }
});
