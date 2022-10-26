// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
// console.log('tofflr liske');
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                let def = document.getElementById('heart')
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    def.style.backgroundColor = 'white';
                    
                }else{
                    likesCount += 1;
                    def.style.backgroundColor = 'red';
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
