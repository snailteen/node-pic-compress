var tinify = require('tinify');
var fs = require("fs");

var arguments = process.argv.splice(2);
console.log("传递的参数是："+arguments)
var path = arguments.join('');//数组转字符串

tinify.key = 'WxxKwGlqXdFFNclqhHHzcTJfZ9kYR1kn';
var file_group = [];
function copy_pic(path){

    fs.readdir(path, function(err,files){//读取文件夹,获取文件数组files
        if(err){
            console.log("error:\n"+err);
            return;
        }
        files.forEach(function(file){
            fs.stat(path+ '/' +file, function(err,stat){ //读取文件状态
                if(err){console.log(err); return;}
                if(stat.isDirectory()){

                    copy_pic(path+'/'+file);
                }else{
                    console.log(path+'/'+file);
                    var name = path + '/' + file;
                    var outName = path  + '/another_' + file;

                    tinify.fromFile(name).toFile(outName);//压缩图片

                    exist_pic(outName,name);
                    fs.unlinkSync(name);
                }
            });

        });
    });

}

function exist_pic(outName,name) {
    var a = name;
    fs.exists(outName,function (exists) {
        if(exists){
            console.log('good');
            rename_pic(outName,a)
        }else{

            console.log('re');
            exist_pic(outName,a);
        }
    })
}

function rename_pic(outName,name) {
    fs.rename(outName,name,function (err) {
        if(err){
            console.log('rename err');
        }else{
            console.log('rename good');
        }
    })
}
copy_pic(path);
