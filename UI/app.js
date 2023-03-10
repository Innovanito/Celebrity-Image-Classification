Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;

        var url = "http://127.0.0.1:5000/classify_image"

        
        $.post(url, {
            image_data: imageData
        }, function (data, status) {
            console.log('data', data)
            console.log('status: ' , status);

            if (!data || data.length == 0) {
                $("#resultHolder").hide()
                $("#divClassTable").hide()
                $("#error").show()
            }

            let match = null
            let bestScore = -1

            for (let i = 0; i < data.length; i++) {
                let maxScoreForeThisClass = Math.max(...data[i].class_probability)

                if (maxScoreForeThisClass > bestScore) {
                    match = data[i]
                    bestScore = maxScoreForeThisClass
                }
            }

            if (match) {
                $("#error").hide();
                $("#resultHolder").show()
                $("#divClassTable").show()

                $("#resultHolder").html($(`[data-player="${match.class}"]`).html())
                console.log('in match')

                let classDictionary = match.class_dictionary
                for (let personName in classDictionary) {
                    let index = classDictionary[personName]

                    let probabilityScore = match.class_probability[index]
                    let elementName = "#score_"+personName
                    console.log(elementName,probabilityScore);
                    $(elementName).html(probabilityScore)

                }
            }
        })

        
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();
    init();
});