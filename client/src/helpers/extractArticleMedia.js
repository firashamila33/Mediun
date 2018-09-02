const extractArticleMedia = (description) => {
    let containsVideo = false
    let containsImage = false

    //Extracting video youtube Url
    let videoIndicator = `{"type":"draft-js-video-plugin-video","mutability":"IMMUTABLE","data":{"src":"`// in raw description format 
    let indexOfVideoIndicator = description.indexOf(videoIndicator)
    var videosub = '';
    let videoLink = ''
    let emeddedYoutubeLink = '';
    if (indexOfVideoIndicator > -1) {
        videosub = description.substring(description.indexOf(videoIndicator)+videoIndicator.length);
        videoLink = videosub.substring(0,videosub.indexOf(`"`))
        if(extractYoutubeVideoID(videoLink)){
            containsVideo = true;
            emeddedYoutubeLink = `https://www.youtube.com/embed/${extractYoutubeVideoID(videoLink)}`// converting to embedded Url
        }
    }
    
    //Extracting Image
    let imageIndicator = `{"type":"IMAGE","mutability":"IMMUTABLE","data":{"src":"`// in raw description format 
    let indexOfimageIndicator = description.indexOf(imageIndicator)
    var imagesub = '';
    let imageLink = ''
    if (indexOfimageIndicator > -1) {            
        imagesub = description.substring(description.indexOf(imageIndicator)+imageIndicator.length);
        imageLink = imagesub.substring(0,imagesub.indexOf(`"`))
        containsImage = true
    }

   
    if(containsVideo && containsImage){
        if(indexOfVideoIndicator < indexOfimageIndicator) {
            return {video:true,emeddedYoutubeLink }
        }else {
            return {image:true,imageLink }
        }
    } 
    if(containsVideo) {
        return {video:true,emeddedYoutubeLink }
    }
    if(containsImage) {
        return {image:true,imageLink }
    }

    return null

}


function extractYoutubeVideoID(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11 ){
        return match[7];
    }else{
        return ''
    }
}


export default extractArticleMedia ;
             
