new Vue({
    el:"#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        attack_status: "",
        logs: [] //{turn: "", text: ""}
    },
    methods:{
       start_game : function(){
            this.game_is_on = true;
            this.attack_status="Oyun Başlıyor"

       },
       attack : function(){
        this.attack_status="Saldırı Yapılıyor"
        setTimeout(()=>{
            var point = Math.ceil(Math.random()*10);
            this.monster_heal-=point;
            this.add_to_log({ turn :"p", text : "OYUNCU ATAĞI("+point+")"})
        },1000)
            
            
            this.monster_attack();
       },
       special_attack : function(){
        this.attack_status="Özel Saldırı Yapılıyor"
        setTimeout(()=>{
            var point = Math.ceil(Math.random()*25);
            this.monster_heal-=point;
            this.add_to_log({ turn :"p", text : "ÖZEL OYUNCU ATAĞI("+point+")"})

        },1000)
            this.monster_attack();
       },
       heal_up: function(){
        this.attack_status="İlk Yardım Yapılıyor"
        setTimeout(()=>{
            var point = Math.ceil(Math.random()*20);
            this.player_heal+=point;
            this.add_to_log({ turn :"p", text : "OYUNCU CANI YÜKSELTİLDİ ("+point+")"})

           
        },1000)
            
            this.monster_attack();
       },
       give_up(){
        this.add_to_log({ turn :"p", text : "OYUNCU PES ETTİ!!"})
        this.player_heal =0;
        this.logs=[]   

       },
       monster_attack: function(){
        setTimeout(()=>{
            var point = Math.ceil(Math.random()*12);
            this.player_heal-=point;
            this.add_to_log({ turn :"m", text : "CANAVAR ATAĞI("+point+")"})
            this.attack_status="Canavar Saldırdı!!!"
        },2000)
       },
       add_to_log : function(log){
            this.logs.push(log);
       }
    },
    watch: {
        player_heal: function (value) {
            if(value<=0){
                this.player_heal=0
                if(confirm("Oyunu KAYBETTİN!! Tekrar Denemek İster Misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs=[]
                    this.attack_status="Oyun Başlıyor!!!"
                }
            } else if (value>=100){
                this.player_heal=100
            }
        },
        monster_heal: function (value) {
            if(value<=0){
                this.monster_heal=0
                if(confirm("Oyunu KAZANDIN!! Tekrar Denemek İster Misin?")){
                    setTimeout(()=>{
                        this.player_heal = 100;
                        this.monster_heal = 100;
                        this.logs=[]
                        this.attack_status="Oyun Başlıyor!!!"
                    },1100)
                    
                    
                }
            } 
        }
    }
})