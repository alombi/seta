<script>
    import { Github } from 'lucide-svelte';
</script>

<br><br><br>
<div class="fake-footer"></div>
<div class="footer">
    <span>
        <small>Sviluppato da <a href="https://alombi.xyz">alombi</a> - © 2023</small>
        <small><a href="https://github.com/alombi/seta"><Github size=15 /> Codice sorgente</a></small>
    </span>
</div>


<style>
    .footer{
        margin-top: 20%;
        font-size: 14px;
    }
    span{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 10px;
        margin-left: 30px;
        margin-right: 30px;
    }
    .fake-footer{
       position: fixed;
       bottom:0;
       left:0;
       width: 100%;
       height:50px;
       background-color: white;
       opacity: .7;
       z-index:3;
    }
    .footer {
       position: fixed;
       bottom:0;
       left:0;
       width: 100%;
       height:50px;
       -webkit-backdrop-filter: blur(20px);
       backdrop-filter: blur(20px);
       z-index: 3;
    }
    @media (prefers-color-scheme: dark){
        .fake-footer{
            background-color: #11191f;
        }
    }
    </style>