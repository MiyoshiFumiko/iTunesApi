//検索結果1件を表示するカードの雛形
const Card = ({url, src, title}) => ` 
    <div class="col-4 mb-5">
                            
    <div class="card">
        <img src="${src}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        
        <button type="button" class="btn btn-light"><a href="${url}" target="_blank">Detail</a></button>
        </div>
    </div>

    </div>

`;

$('#search-btn, #search-word').on('click, keypress', () => {
   
    //検索結果を空にする
    $('#results').empty();
    
    //検索ワードの取得
    const word = $('#search-word').val();

    $.LoadingOverlay("show");
    
    //Ajaxの開始
    $.ajax({
        url: 'https://itunes.apple.com/search',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            term: word,
            country: 'jp',
            media: 'music',
            lang: 'ja_jp',
        }
    }).done((response) => {
        for(let i = 0; i < response.results.length; i++){
            
            let src = response.results[i].artworkUrl100
            let title = response.results[i].trackName
            let url = response.results[i].trackViewUrl
        
            $('#results').append(Card({ src : src, title: title, url: url
            
            }));

        } 
       
    }).fail((error) => {
        console.log(error)
    
    }).always(() => { 
        $.LoadingOverlay("hide");
    })      
    
})
