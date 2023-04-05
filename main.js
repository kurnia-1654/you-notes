$(document).ready(function () {
    
    // history.pushState('', '')

    // Setting theme

    // Local Storage Save Preference
    // Default theme is Light -- dark mode btn is Off
    if (localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'light')
    }


    var getTheme = localStorage.getItem('theme')

    // If user switch on the dark mode button 
    // Set item local Storage 'theme' => dark


    changeTheme() // change the theme onload 


    $('.dark-mode').click(function () {

        if (getTheme == 'light') {
            // On click set to dark mode
            localStorage.setItem('theme', 'dark')
            getTheme = 'dark'
            $('.dark-mode').addClass('on')
            changeTheme()
        } else if (getTheme == 'dark') {
            // On click set to light mode
            localStorage.setItem('theme', 'light')
            getTheme = 'light'
            $('.dark-mode').removeClass('on')
            changeTheme()
        }
    })








    function changeTheme() {
        if (getTheme == 'dark') $('html').removeClass('light-theme'), InvertColor(), $('.dark-mode').addClass('on'); else $('html').addClass('light-theme'), InvertColor(), $('.dark-mode').removeClass('on')
    }







    // Setting theme based on color scheme preference
    // will be enable if user switch on the button 
    // setTheme()
    function setTheme() {
        if ($('.system-theme').val() == 'true') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                $('html').removeClass('light-theme')

                // Default theme is light
            }
        }
    }




    // $('.system-theme').click(function(){

    //     if($('.system-theme').val() == 'true'){
    //         $('.system-theme').val(false)

    //     }else{
    //         $('.system-theme').val(true)

    //     }

    //     $('.system-theme').toggleClass('on')

    // })




    // Invert Icon COlor
    InvertColor()
    function InvertColor() {
        if ($('html').hasClass('light-theme')) {
            console.log('true');
            $('.icon').css({
                filter: 'invert(1)'
            })
        } else {
            console.log('false');

            $('.icon').css({
                filter: 'invert(0)'
            })
        }
    }



    // function no_notes(no_notes) {   
    //     if (no_notes){
    //         $('.no-notes').hide()
    //     }
    // }


    var add_note = $('.add-note-btn')
    var search_box = $('.searchbox')
    var back_btn = $('.back-btn')
    var overlay = $('.overlay')
    var setlabelOverlay = $('.set-label-overlay')
    var addNewLabelOverlay = $('.add-new-label-overlay')

    var empty_note = true;
    var empty_trash = true;
    var empty_note_show = true;
    var empty_trash_show = false;
    var trash_view = false;
    var note_view = true;




    showNote()



    search_box.on('click', function () {
        if (trash_view) {
            history.pushState('search', '')
            searchTrash()
        } else if (note_view) {
            searchNote()
            history.pushState('search', '')
        }
    })



    function searchTrash() {
        $('.search').fadeIn(150)
        $('#search-input').focus()
        $('.empty-trash-info').hide()
        $('#search-input').attr('placeholder', 'Search your trash...')
        $('.body-text').text('Your notes in trash will be displayed here')

        // popStateCloseOverlay(showTrash)
        window.onpopstate = function () {
            $('.search').fadeOut(150)
            showTrash()
        }

        back_btn.click(function () {
            $('.search').fadeOut(150, showTrash())
            history.back()
        })
    }

    function searchNote() {
        $('.search').fadeIn(150)
        $('#search-input').focus()
        // popStateCloseOverlay(showNote)

        window.onpopstate = function () {
            $('.search').fadeOut(150)
            showNote()
        }

        back_btn.click(function () {
            $('.search').fadeOut(150, showNote())
            history.back()
        })
    }











    function showTrash() {
        trash_view = true
        note_view = false
        closeMenu()
        $('.empty-notes').hide()
        $('.notes-wrapper').hide()
        $('.empty-trash-info').show()
        $('.searchbox').text('Search your trash...')
        add_note.hide()
    }


    function checkNote() {
        // Checking wether notes is empty
        if (empty_note) {
            $('.empty-notes').show()

        } else {

            $('.notes-wrapper').show()
            $('.empty-notes').hide()
            // showAllNote()   
        }
    }

    function showNote() {
        closeMenu()
        
        if (localStorage.getItem('notes') != null){
            var arr = JSON.parse(localStorage.getItem('notes'))
            var n
            if (arr == null){
                n = 0
            }else {
                n = arr.length
            }
            
            if (n > 0) {
                empty_note = false
                checkNote()

            } else {
                checkNote()
            }
        }

       
        
        if(localStorage.getItem('notes') != null ){
            loadNote()
        }

        trash_view = false
        note_view = true

        $('.searchbox').text('Search your note...')
        $('.empty-trash-info').hide()
        add_note.show(30)





    }



    $('.all-note').on('click', showNote)
    $('.trash').on('click', showTrash)



    add_note.click(function () {
        // no_notes(true)

    })



    overlay.click(function () {
        $('.overlay').fadeOut(150)
        $('.menu').css({
            left: "-100vw",
        }).hide(150)
    })







    // Open Menu

    $('.menu-btn').click(function () {
        history.pushState('menu', '')

        $('.menu').show(0).css({
            display: 'flex',
            left: "0",
        })


        overlay.show()
        // checkState()
        popStateCloseOverlay()
    })

    function closeMenu() {
        $('.menu').css({
            left: "-100vw",
        }).hide(150)
        $('.overlay').fadeOut(150)
        // history.pushState('', '')
        popStateCloseOverlay()
    }






    $('.settings').click(function () {
        // history.back()
        $('.setting-page').show(1).css({
            bottom: "0px",
        })

        history.pushState('setting', null, '')

        popStateCloseOverlay()
    })

    $('.setting-page .back-btn').click(function () {
        $('.setting-page').css({
            bottom: "-100vh",

        }).hide(200)
    })





    // Toggle setting on-off 

    // checkToggle()







    $(document).on('swipe', 'a', function (event) {
        console.log(event)
    })



    // auto resize textarea
    $('textarea').on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px'

        // Last mod
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var date = new Date()
        var hour, minute
        if(date.getHours() < 10){
            hour = "0" + date.getHours()
        }else {
            hour = date.getHours()
        }
        
        // console.log(hour);
        if(date.getMinutes() < 10) {
            minute = "0" + date.getMinutes()
        }else{
            minute = date.getMinutes()
        }

        var lastModTime = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + hour + ":" + minute;
        
        $('.last-mod').show(10).children().text(lastModTime)

    })


    $('textarea').on('input', function () {
        // Auto save button

        var noteBodyText = $(this).val()
        var lastChar = noteBodyText[noteBodyText.length - 1]

        if (lastChar == ' ') $('.save-info').html('<span class="ic-saving"></span>Saving...'), $('.save-info').fadeIn(150)




        setTimeout(() => {
            $('.save-info').html('<span class="ic-saved"></span>Saved')
        }, 1500);

        setTimeout(() => {
            $('.save-info').fadeOut(150)
        }, 2000);


    })











    $('.form-note-input').scroll(function () {
        if ($('.form-note-input form').outerHeight(true) >= $('body').height() - 65) {
            $('.add-note .page-nav').addClass('sticky')
            if ($('.form-note-input').scrollTop() < 8) {
                $('.add-note .page-nav').removeClass('sticky')
            }
        } else {
            $('.add-note .page-nav').removeClass('sticky')
        }
    })





    $('.add-note-btn').click(function () {
        history.pushState('add-note', '')
        $('.add-note').show(0).css({

            right: 0
        })
        $('.pin').removeClass('pinned')
        $('main').fadeOut(0)


        // Created date
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        var date = new Date()
        var createDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        $('.date-created span').html(createDate).show(10)

        back_btn.click(()=> {
            closeAddNote()
        })

        popStateCloseOverlay()
    })

    
    



    


    function closeAddNote() {
        // console.log('id: ' + id);
        $('.add-note').css({
            right: '-100vw',
        }).hide(150)

        $('.del-lbl').parent().remove()

        saveToLocal(); 
        

        $('.form-note-input textarea').val("").height(20)
        $('.last-mod').hide()
        $('main').fadeIn(150)
        $('.more-menu-list').hide()

        // history.back()
    }

    


    $('.pin').click(function () {
        $(this).toggleClass('pinned')
    })


    // Open and close more menu list
    if (history.state != 'more-menu-show') {
        $('.more-menu').click(function () {
            history.pushState('more-menu-show', null, '')
            $('.more-menu-list').toggle()
            popStateCloseOverlay()
        })
    } else if (history.state == 'more-menu-show') {
        history.replaceState('add-note', '')
    }

    $('.add-note').click(function (e) { // using parent selecter of the button to be work
        if ((e.target).className !== "more-menu") {
            $('.more-menu-list').hide()

            popStateCloseOverlay()
        }
    })





    // Open close label page

    $('.labels').click(function () {
        history.pushState('label-page', '')
        // closeMenu()
        $('.label-page').show(1).css({
            bottom: "0"
        })
        popStateCloseOverlay()
    })
    $('.label-page .back-btn').click(function () {
        history.replaceState('menu', '')
        $('.label-page').css({
            bottom: "-100vh"
        }).hide(150)
        popStateCloseOverlay()
    })



    // Add new label

    var label = []

    if (localStorage.getItem('label') == null) {
        localStorage.setItem('label', [])
    } else {
        label = JSON.parse(localStorage.getItem('label'))
    }





    for (var a = 0; a < label.length; a++) {
        loadLabel()
    }

    function loadLabel() {
        $('.label-list').append('<li class="label"><span class="icon edit"></span><span class="name">' + label[a] + '</span></li>')
    }





    $('button.add-label').click(function () {
        history.pushState('add-label', '')
        popStateCloseOverlay()
        addNewLabelOverlay.show().css({
            'z-index': '9'
        })

        addNewLabelOverlay.click(() => {
            history.replaceState('label-page', '')
            $('.add-new-label').css({ display: 'none' })
            addNewLabelOverlay.css({
                'z-index': '2'
            }).hide(0)
            popStateCloseOverlay()
        })

        var labelInput = $('.add-new-label input')

        $('.add-new-label').css({ display: 'block' })
        $('.add-new-label input').focus()



        $('.act-add').click(() => {
            history.replaceState('label-page', '')

            popStateCloseOverlay()
            if (labelInput.val() !== '') {
                label.push(labelInput.val())
                localStorage.setItem('label', JSON.stringify(label)) //Push new label as string array to local storage


                if (history.state = 'label-page') loadLabel();

                reloadLabelSelection(labelInput.val())
                $('.add-new-label').css({ display: 'none' })
                overlay.hide(0).css({
                    'z-index': '2'
                })
                labelInput.val('')
                addNewLabelOverlay.hide()
            }

        })


    })


    function reloadLabelSelection(val) {

        $('.label-selection option').eq(0).siblings().remove()
        for (let a = 0; a < label.length; a++) {
            $('.label-selection').append('<option value = "' + label[a] + '">' + label[a] + '</option>')
        }
        $('.label-selection option').eq(label.length).attr('selected', 'selected')
    }


    // Asign label to note -- li.add-label

    function showSetLabel() {
        // history.pushState('set-label', '')
        history.replaceState('set-label', '')
        popStateCloseOverlay()

        $('.set-label').fadeIn(150)
        setlabelOverlay.show(1).css({
            'z-index': '7'
        }).click(() => {
            $('.set-label').fadeOut(150)
            $('.label-selection option').eq(0).siblings().remove()
            $('.label-selection option:eq(0)').prop('selected', true)
            overlay.css({
                'z-index': '2'
            })
        })

        for (let a = 0; a < label.length; a++) {

            if (label[a] == labelChosed) {
                $('.label-selection').append('<option disabled value = "' + label[a] + '">' + label[a] + '</option>')
            } else {
                $('.label-selection').append('<option value = "' + label[a] + '">' + label[a] + '</option>')
            }
        }


    }



    // Var to store label has selected option and asign disabled property 
    var labelChosed = ''



    $('li.add-label').click(() => {
        showSetLabel()
        console.log(labelChosed);

        $('.more-menu-list').hide()

        $('.act-set-label').click(() => {
            var selectedLabel = $('.label-selection').find('option:selected')
            if (selectedLabel.val() != $('.label-selection option:eq(0)').val()) {

                $('.set-label').fadeOut(150)
                setlabelOverlay.fadeOut(150).css({
                    'z-index': '2'
                })
                labelChosed = selectedLabel.val()
                console.log(labelChosed);
                $('.label-selection option').eq(0).siblings().remove()
                $('.label-selection option:eq(0)').prop('selected', true)
                showLabelSelected(selectedLabel.val())
                removeLabel()
                history.replaceState('add-note', '')
            }



        })

        setlabelOverlay.click(function () {
            $('.set-label').fadeOut(150)
            setlabelOverlay.fadeOut(150).css({
                'z-index': '2'
            })
            history.replaceState('add-note', '')
        })

    })


    function showLabelSelected(label) {
        $('.note-label').append('<li class="labels" value="' + label + '"><span></span>' + label + '<span class="del-lbl">x</span></li>')
    }

    function removeLabel() {
        $('.del-lbl').click(function () {
            $(this).parent().remove()
        })
    }

    $('li.delete').click(function () {
        showTrash()
        closeAddNote()
    })

    // Share
    $('li.share').click(function () {
        if (navigator.share) {
            navigator.share({
                title: $('.note-title').val(),
                text: $('.note-body').val()
            })
        } else {
            var value = $('.note-title').val() + "\n\n" + $('.note-body').val()
            navigator.clipboard.writeText(value).then(() => alert('Copied to clipboard!'))
        }
    })







    // popopState back button close overlay
    // Window.onpopstate



    function popStateCloseOverlay() {
        // alert(history.state)
        if (history.state == 'setting') {
            window.onpopstate = function () {
                $('.setting-page').css({
                    bottom: "-100vh",
                }).hide(200)

                popStateCloseOverlay()
            }
        } else if (history.state == 'add-note') {

            window.onpopstate = function () {
                closeAddNote()
                popStateCloseOverlay()
            }
        } else if (history.state == 'edit-note') {

            window.onpopstate = function () {
                closeEditNote()
                popStateCloseOverlay()
            }
        } else if (history.state == 'menu') {
            window.onpopstate = function () {
                closeMenu()
                popStateCloseOverlay()
            }
        } else if (history.state == 'more-menu-show') {

            window.onpopstate = function () {
                $('.more-menu-list').hide()
                popStateCloseOverlay()
            }
        } else if (history.state == 'set-label') {

            window.onpopstate = function () {
                $('.set-label').fadeOut(150)
                setlabelOverlay.fadeOut(150).css({
                    'z-index': '2'
                })

                popStateCloseOverlay()
            }
        } else if (history.state == 'label-page') {

            window.onpopstate = function () {
                $('.label-page').css({
                    bottom: "-100vh"
                }).hide(150)
                history.replaceState('menu', '')
                popStateCloseOverlay()
            }
        } else if (history.state == 'add-label') {

            window.onpopstate = function () {
                $('.add-new-label').css({ display: 'none' })
                overlay.hide(0).css({
                    'z-index': '2'
                })
                history.replaceState('label-page', '')
                addNewLabelOverlay.hide()
                popStateCloseOverlay()
            }
        }
    }

    $('.back-button, .overlay').click(function () {
        // history.back()
    })

    // End of popstate











    $.getJSON("notes/notes.json", function (notes) {
        var n = Object.keys(notes).length
        // console.log('notes' + notes[1]);
        // for (let a = 1; a <= n; a++) {
        //     $('#pinned-notes').append('<div class="note" id="' + a + '"><span class="icon pinned"></span><img class="thumbnail" alt=""/><h2 class="title">' + notes[a].title + '</h2><p class="text">' + notes[a].note + '</p><div class="info"><span class="date">' + notes[a].date + '</span><span class="lbl"><span class="icon"></span>' + notes[a].label + '</span><span style="display:none" class="mod-date">' + notes[a].mod_date + '</div></div>')
        //     console.log(notes[a].mod_date);

        // }

    })


    


    function loadNote() {

        if (localStorage.getItem('notes') != '') {
            var notes = JSON.parse(localStorage.getItem('notes'))
            var notesObj  = Object.assign({}, notes) // convert array to obj
            $('#pinned-notes, #all-notes').children().remove()

            let n = Object.keys(notesObj).length
    
            for (let a = n - 1; a >= 0; a--) { 
                
                if(notesObj[a][a].pinned == true) { 
                    $('.notes-wrapper > span').eq(0).css('display', 'block')
                    $('#pinned-notes').css('display', 'block')
                    $('#pinned-notes').append('<div class="note" id="' + a + '"><span class="icon pinned"></span><img class="thumbnail" alt=""/><h2 class="title">' + notesObj[a][a].title + '</h2><p class="text">' + notesObj[a][a].note + '</p><div class="info"><span class="date">' + notesObj[a][a].date + '</span><span class="lbl"><span class="icon"></span>' + notesObj[a][a].label + '</span><span style="display:none" class="mod-date">' + notesObj[a][a].mod_date + '</div></div>')
                }else {
                    $('#all-notes, .all').css('display', 'block')
                    $('#all-notes').append('<div class="note" id="' + a + '"><span class="icon pinned" style="visibility:hidden"></span><img class="thumbnail" alt=""/><h2 class="title">' + notesObj[a][a].title + '</h2><p class="text">' + notesObj[a][a].note + '</p><div class="info"><span class="date">' + notesObj[a][a].date + '</span><span class="lbl"><span class="icon"></span>' + notesObj[a][a].label + '</span><span style="display:none" class="mod-date">' + notesObj[a][a].mod_date + '</div></div>')
                }
            }
            for (let b = 0; b < n; b++){
                if($('.lbl').eq(b).text() == "null") {
                    
                    $('.lbl').eq(b).hide()
                }

            }

            editNote()
        }
        // console.log(typeof(notes));
        

        // Using for loop  to conver arr to object
        // let notesObj2 = {}
        // for (let i = 0; i < notes.length; i++ ){
        //     notesObj2[i] = notes[i]
        // }

        // var note = {"1":{"title":"dadad","date":"Created : April 3, 2023","mod_date":"Edited : April 3, 2023 at 16:57","note":"asdasdas","bg":false,"bg_url":"icon/ic-label.svg","thumb":false,"thumb_url":"","color_theme":"default"}}

        // console.log(note[1].title);
        // errro undevined 
        
        // console.log(notesObj[0][1]);
        // console.log(JSON.stringify(notesObj[1]));
        
        // console.log(Object.keys(notesObj));
        


    }


   
    
    function editNote(){
        var id = $('.note').attr('id') 
        $('.note').click(function () {
            
    
            let index = JSON.parse(localStorage.getItem('notes'))[id][id]
            // console.log(index);
            
            history.pushState('edit-note', '')
            
    
            var title = index.title
            var note = index.note
            var date = index.date
            var mod = index.mod_date
            console.log(mod);
            var label = index.label
            var pin = false
            
            // alert(id)
    
            // console.log(mod);
    
            // console.log(note);
            $('.add-note').show(0).css({
                right: 0
            })
    
            
            if($(this).parent().attr('id') == 'pinned-notes') {
                
                $('.pin').addClass('pinned')
            }
            $('main').fadeOut(0)
    
            $('.add-note .note-title').val(title)
            $('.add-note .note-body').val(note)
            var titleHeight = document.querySelector('.note-title').scrollHeight
            var noteHeight = document.querySelector('.note-body').scrollHeight
            // console.log(titleHeight, noteHeight);
            $('.add-note .note-title').innerHeight(titleHeight)
            $('.add-note .note-body').innerHeight(noteHeight)
            $('.date-created span').text(date)
            
            $('.last-mod').show(0).children().html(mod)
    
            if(history.state == 'edit-note') {
                alert('editnote')
                window.onpopstate = function () {
                    saveEditedNote(id)
                    closeEditNote()
                    
                }
        
                $('.back-btn').click(()=> {
                    saveEditedNote(id);
                    closeEditNote()
                    
                })
            }
    
        })
    
    
        
    }
    
    
    function closeEditNote() {
            
        $('.add-note').css({
            right: '-100vw',
        }).hide(150)
    
        
    
        $('.form-note-input textarea').val("").height(20)
        $('.last-mod').hide()
        $('main').fadeIn(150)
        $('.more-menu-list').hide()
    
        history.back()
    }
    
    
    function saveEditedNote(id) { // will be called in editNote()
        // console.log('false'); 
        var title = $('.note-title').val()
    
        var note = $('.note-body').val()
        var mod = $('.last-mod span').html()
        var date = $('.date-created span').html()
        var pinned = false
            if($('.pin').hasClass('pinned')) pinned = true;
    
        var label = ''
        if ($('li.labels').eq(1).length == 0) label = 'null'; else label = $('li.labels').eq(1).attr('value')
    
        var editedNote = {
            [id]: {
                "title": title,
                "date": date,
                "mod_date": mod,
                "note": note,
                "label": label,
                "pinned": pinned,
                "bg": false,
                "bg_url": "icon/ic-label.svg",
                "thumb": false,
                "thumb_url": "",
                "color_theme": "default"
            }
        }
    
        console.log(editedNote);
    
        // Comparing value of two object
        var obj = JSON.parse(localStorage.getItem('notes'))
        var oldNote = JSON.stringify(obj[id][id])
        
        console.log(JSON.stringify(editedNote[id]) === oldNote)
        // console.log(oldNote);
        // console.log(JSON.stringify(editedNote[id]));
    
        // alert('{"title":"2","date":"April 4, 2023","mod_date":"April 4, 2023 at 22:44","note":"","label":"null","pinned":false,"bg":false,"bg_url":"icon/ic-label.svg","thumb":false,"thumb_url":"","color_theme":"default"}' === '{"title":"2","date":"April 4, 2023","mod_date":"April 4, 2023 at 22:44","note":"","label":"null","pinned":false,"bg":false,"bg_url":"icon/ic-label.svg","thumb":false,"thumb_url":"","color_theme":"default"}')
        
        // alert(oldNote === editNote[id])
        if(JSON.stringify(editedNote[id]) !== oldNote) {
            var newNoteArr = [] 
            let n = Object.keys(obj).length
    
            console.log(n);
    
            
            for (let i = n-1; i >= n; i++){
                console.log('id: ' + id);
                console.log("JSON.stringify(obj[i]) : "+JSON.stringify(obj[i]));
                
                if(i != id) newNoteArr.push(obj[i]) // for filtering oldnote that has edited
                
            }
            
            console.log("editedNote[id]) : " + JSON.stringify(editedNote));
            newNoteArr.push(editedNote) // after all notes filtered, then push edited note to the last index
    
            
            console.log(newNoteArr);
    
            localStorage.setItem('notes', JSON.stringify(newNoteArr))
    
            loadNote()
        } 
        
        editedNote = {}
    }





    // Create new note and save to local storage


    function saveToLocal() {
        // alert('executed')
        var title = $('.note-title').val()

        var note = $('.note-body').val()
        var mod = $('.last-mod span').html()
        var date = $('.date-created span').html()
        var pinned = false
            if($('.pin').hasClass('pinned')) pinned = true;

        var label = ''
        // console.log('label' + $('li.labels').eq(1).attr('value') );
        if ($('li.labels').eq(1).length == 0) label = 'null'; else label = $('li.labels').eq(1).attr('value')

        
        if (title || note !== '') {
            if (localStorage.getItem('notes') == null) {
                localStorage.setItem('notes', '')
            }
    
            var n
            if (localStorage.getItem('notes') == '') {
                n = 0
            } else {
                var obj = JSON.parse(localStorage.getItem('notes'))
                n = Object.keys(obj).length
            }
            
    
            var newNoteObj = {
                [n]: {
                    "title": title,
                    "date": date,
                    "mod_date": mod,
                    "note": note,
                    "label": label,
                    "pinned": pinned,
                    "bg": false,
                    "bg_url": "icon/ic-label.svg",
                    "thumb": false,
                    "thumb_url": "",
                    "color_theme": "default"
                }
            }

            console.log(newNoteObj);
            var newNotes = []

            if (localStorage.getItem('notes') == '') {
                newNotes.push(newNoteObj)
                localStorage.setItem('notes', JSON.stringify(newNotes))

            } else {
                let arr = JSON.parse(localStorage.getItem('notes'))

                arr.forEach(e => {
                    newNotes.push(e)
                });
                newNotes.push(newNoteObj)
                console.log(newNotes);

                
                localStorage.setItem('notes', JSON.stringify(newNotes))
            }
        }
        showNote()
        // End of saveToLocal()
    }


    

    
    

    


})