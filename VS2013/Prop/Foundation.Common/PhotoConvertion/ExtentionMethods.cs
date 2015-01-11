//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.IO;

namespace PhotoConvertion.Media
{

    public static class MediaExtentionMethods
    {
        public delegate string GenerateIdentityForImageHandler(string imageSettingKey, DateTime uploadDate);

        public static GeneretedResult GenerateImages(this HttpPostedFile file, ImagesSetting setting, DateTime uploadDate,
         GenerateIdentityForImageHandler generateIdentityForImageHandler)
        {
            GeneretedResult generatedResult = new GeneretedResult();

            ImagesEditor imgEditor = new ImagesEditor(setting);

            generatedResult.Message = imgEditor.GetValidateMessage(file.InputStream);

            if (generatedResult.Message != "")
            {
                return generatedResult;
            }
            try
            {
                string identity = ImagesEditor.CreateImageIdentity();
                if (generateIdentityForImageHandler != null)
                    identity = generateIdentityForImageHandler(setting.Name, uploadDate);


                if (setting.FixSourceExtention)
                    setting.OutputImageFormat = file.FileName.Substring(file.FileName.LastIndexOf('.') + 1);

                var mainImagePath = ImagesEditor.GetRealImagePath(setting.Path, "Main", uploadDate, identity, setting.OutputImageFormat.ToString());

                file.SaveAs(mainImagePath);

                imgEditor.SaveAndGetPaths(mainImagePath, identity, uploadDate);

                generatedResult.IsSuccessfull = true;
                generatedResult.Identity = identity;
            }
            catch (Exception ex)
            {
                generatedResult.Message = ex.Message;
                generatedResult.IsSuccessfull = false;
                generatedResult.Identity = string.Empty;
            }

            return generatedResult;
        }

        public static GeneretedResult GenerateImages(this HttpPostedFile file, string setting, DateTime uploadDate,
            GenerateIdentityForImageHandler generateIdentityForImageHandler)
        {
            ImagesSetting imgSetting = new ImagesSetting();

            if (setting.ToLower().IndexOf("outputimageformat=pub,") != -1)
            {
                setting = setting.Replace("OutputImageFormat=pub", "OutputImageFormat=" + file.FileName.Substring(file.FileName.LastIndexOf('.') + 1));
            }

            imgSetting = setting.JsonTo(imgSetting);

            return file.GenerateImages(imgSetting, uploadDate, generateIdentityForImageHandler);
        }

        public static GeneretedResult GenerateImages(this HttpPostedFile file, string setting)
        {
            return file.GenerateImages(setting, DateTime.Now, GenerateIdentityForImage);
        }

        public static GeneretedResult GenerateImages(this HttpPostedFile file, ImagesSetting setting)
        {
            return file.GenerateImages(setting, DateTime.Now, GenerateIdentityForImage);
        }

        public static GeneretedResult GenerateImages(this HttpPostedFile file)
        {
            return file.GenerateImages(new ImagesSetting(), DateTime.Now, GenerateIdentityForImage);
        }

        


        public static string GenerateIdentityForImage(string imageSetting, DateTime uploadDate)
        {
            return "img" + Guid.NewGuid().ToString().Replace("-", "_");
        }

        public static string GetPath(this string id, ImagesSetting setting, string size, DateTime uploadedDate)
        {
            return ImagesEditor.GetImagePath(setting.Path, size, uploadedDate, id, setting.OutputImageFormat);
        }
        public static string GetPath(this string id, string size, DateTime uploadedDate)
        {
            return id.GetPath(new ImagesSetting(), size, uploadedDate);
        }
    }

    public class GeneretedResult
    {
        public string Message { get; set; }
        public bool IsSuccessfull { get; set; }
        public string Identity { get; set; }
    }
}
