//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;


namespace PhotoConvertion.Media
{
    public class ImagesEditor
    {
        public ImagesEditor(ImagesSetting imagesSettings)
        {
            _imageSetting = imagesSettings;
        }

        private ImagesSetting _imageSetting;

        public void DrawImage(Graphics graphics, ImageSizeHelper imageSize, PositionModes positionMode, Image imageObject)
        {
            #region Draw Base Image
            try
            {
                Rectangle rect = new Rectangle();

                double W = (double)imageSize.Width  // Result Width
                             , H = (double)imageSize.Height // Result Heigth
                             , w = (double)imageObject.Width        // Source Width
                             , h = (double)imageObject.Height;       // Source Height

                double RWH = W / H;                 // Result Ratio Width In Height
                double rwh = w / h;                 // Source Ratio Width In Height
                int Wi = (int)((H * w) / h);             // image width after fit
                int Hi = (int)((W * h) / w);             // image heigth after fit
                int Li = (int)((W - Wi) / 2);             // image Left after fit
                int Ti = (int)((H - Hi) / 2);

                switch (positionMode)
                {
                    case PositionModes.Stretch:
                        {
                            rect = new Rectangle(0, 0, imageSize.Width, imageSize.Height);
                            break;
                        }
                    case PositionModes.Title:
                        {
                            rect = new Rectangle(0, 0, imageSize.Width, imageSize.Height);
                            graphics.FillRectangle(new TextureBrush(imageObject, System.Drawing.Drawing2D.WrapMode.Tile), rect);
                            return;
                        }
                    case PositionModes.Fit:
                        {
                            if (RWH > rwh) // V Mode
                            { rect = new Rectangle(Li, 0, Wi, imageSize.Height); }
                            else           // H Mode
                            { rect = new Rectangle(0, Ti, imageSize.Width, Hi); }

                            break;
                        }
                    case PositionModes.Fill:
                        {
                            if (RWH < rwh) // V Mode
                            { rect = new Rectangle(Li, 0, Wi, imageSize.Height); }
                            else           // H Mode
                            { rect = new Rectangle(0, Ti, imageSize.Width, Hi); }

                            break;
                        }
                    case PositionModes.Center:
                        {
                            rect = new Rectangle((int)(((double)imageSize.Width - (double)imageObject.Width) / 2)
                              , (int)(((double)imageSize.Height - (double)imageObject.Height) / 2), imageObject.Width, imageObject.Height);
                            break;
                        }

                }
                graphics.SmoothingMode = SmoothingMode.Default;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.DrawImage(imageObject, rect);
            }
            catch
            {
            }
            #endregion
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="graphics"></param>
        /// <param name="imageSize"></param>
        /// <param name="imageStructJsonFormatString">{PositionMode=[Fill|Fit|Stretch|Center|Title],BackColor=#ffff00,ImagePath=FullImagePath}</param>
        public void DrawImage(Graphics graphics, ImageSizeHelper imageSize, string imageStructJsonFormatString, string basePath)
        {
            JsonDictionaryConverter convertor = new JsonDictionaryConverter(imageStructJsonFormatString);

            PositionModes positionMode = PositionModes.Title;
            if (convertor.GetDictionaryItem("PositionMode") != null)
                positionMode = (PositionModes)Enum.Parse(typeof(PositionModes), convertor.GetDictionaryItem("PositionMode"));

            if (convertor.GetDictionaryItem("BackColor") != null)
            { graphics.FillRectangle(new SolidBrush(System.Drawing.ColorTranslator.FromHtml(convertor.GetDictionaryItem("BackColor"))), new Rectangle(0, 0, imageSize.Width, imageSize.Height)); }

            try
            {
                Image img = Image.FromFile(convertor.GetDictionaryItem("ImagePath"));
                DrawImage(graphics, imageSize, positionMode, img);
            }
            catch
            {
                try
                {
                    var page = System.Web.HttpContext.Current.Handler as System.Web.UI.Page;
                    Image img = Image.FromFile(page.MapPath("~") + convertor.GetDictionaryItem("ImagePath").Replace("/", "\\"));
                    DrawImage(graphics, imageSize, positionMode, img);
                }
                catch
                {
                    try
                    {
                        System.Text.Encoding enc = new System.Text.UTF8Encoding();
                        string type = "Unknown Type";
                        try { type = System.Web.HttpContext.Current.Request.Files[0].ContentType.Replace("application/", "").Replace("-", " ").Replace("/", " "); }
                        catch { }// convertor.GetDictionaryItem("FileType").Replace("application/", "").Replace("-", " ").Replace("/", " ");
                        var bb = (enc).GetBytes(type).ToList();
                        var by = from x in bb.Cast<byte>()
                                 let i = int.Parse(x.ToString())
                                 select i;

                        byte r = (byte)by.ToList<int>()[0];
                        byte g = (byte)by.ToList<int>()[1];
                        byte b = (byte)by.ToList<int>()[2];

                        Color co = Color.FromArgb(255, r, g, b);
                        Color cf = Color.FromArgb(255, (byte)((int)r + 128), (byte)((int)g + 128), (byte)((int)b + 128));

                        if (type.Length > 20) type = type.Substring(0, 20);
                        float fs = (float)type.Length * (-1.3f) + 23.92f;
                        if (fs < 10f) fs = 10f;
                        graphics.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.GammaCorrected;
                        graphics.TextRenderingHint = System.Drawing.Text.TextRenderingHint.ClearTypeGridFit;

                        graphics.FillRectangle(new SolidBrush(co), new RectangleF(0f, 0f, (float)imageSize.Width, (float)imageSize.Height));

                        graphics.DrawString(
                            type,
                            new Font("tahoma", fs, FontStyle.Bold, GraphicsUnit.Point),
                            new SolidBrush(cf),
                            new RectangleF(0f, 0f, (float)imageSize.Width, (float)imageSize.Height),
                            new StringFormat() { LineAlignment = StringAlignment.Center, FormatFlags = StringFormatFlags.DisplayFormatControl, Alignment = StringAlignment.Center }
                            );

                    }
                    catch
                    {
                    }
                }

            }
        }

        public Bitmap CreateImage(ImageSizeHelper imageSize, string basePath)
        {
            // Create Bitmap
            Bitmap bmp = new Bitmap(imageSize.Width, imageSize.Height);
            Graphics gh = Graphics.FromImage(bmp);

            // Background
            DrawImage(gh, imageSize, _imageSetting.Background, basePath);
            // Zoom and Draw Image with Effect
            try
            {
                Image img = ValidateFileAndGetImage(basePath);
                DrawImage(gh, imageSize, (PositionModes)Enum.Parse(typeof(PositionModes), _imageSetting.PositionMode), img);
            }
            catch
            {
            }

            // Draw Copyright Text

            if (imageSize.Width * imageSize.Height < 100 * 100) return bmp;
            try
            {
                SizeF textSize = gh.MeasureString(_imageSetting.Copyright, new Font("tahoma", 8.50f));
                int textLeft = (int)(((double)imageSize.Width - (double)textSize.Width) / 2);
                int textTop = (int)((double)imageSize.Height - (double)textSize.Height) - 2;


                //gh.DrawString(_imageSetting.Copyright, new Font("tahoma", 8.00f), new SolidBrush(Color.FromArgb(200, 255, 255, 255)), (float)textLeft+1.0f, (float)textTop+1.0f);
                gh.FillRectangle(new SolidBrush(Color.FromArgb(100, 255, 255, 255)), (float)textLeft, (float)textTop, textSize.Width, textSize.Height);
                gh.DrawString(_imageSetting.Copyright, new Font("tahoma", 8.00f), new SolidBrush(Color.FromArgb(255, 0, 0, 0)), (float)textLeft, (float)textTop);

                // Draw Watermark

                textSize = gh.MeasureString(_imageSetting.Watermark, new Font("Arial", 16.00f, FontStyle.Bold));
                textLeft = (int)(((double)imageSize.Width - (double)textSize.Width) / 2);
                textTop = (int)(((double)imageSize.Height - (double)textSize.Height) / 2);


                // gh.DrawString(_imageSetting.Watermark, new Font("Arial", 16.00f, FontStyle.Bold), new SolidBrush(Color.FromArgb(50, 0, 0, 0)), (float)textLeft+1.0f, (float)textTop+1.0f);
                gh.DrawString(_imageSetting.Watermark, new Font("Arial", 16.00f, FontStyle.Bold), new SolidBrush(Color.FromArgb(150, 255, 255, 255)), (float)textLeft, (float)textTop);
            }
            catch
            {
            }
            return bmp;
        }

        public static String GetImagePath(string PathFormat, string size, DateTime RegisterDate, string Identity, string Extension)
        {
            if (Identity == null)
                Identity = CreateImageIdentity();


            var path = PathFormat
                .Replace("[Year]", RegisterDate.Year.ToString())
                .Replace("[Month]", RegisterDate.Month.ToString())
                .Replace("[Day]", RegisterDate.Day.ToString())
                .Replace("[Size]", size.ToString())
                .Replace("[Identity]", Identity)
                .Replace("[Extension]", size.ToLower() != "main" ? "jpg" : Extension)
                .Replace("[RootDirectory]", "")
                .Replace("\\\\", "\\")
            .Replace("\\", "/");
            CreateImageDirectory(path);
            return path;
        }
        public static String GetRealImagePath(string PathFormat, string size, DateTime RegisterDate, string Identity, string Extension)
        {
            if (Identity == null)
                Identity = CreateImageIdentity();


            var path = PathFormat
                .Replace("[Year]", RegisterDate.Year.ToString())
                .Replace("[Month]", RegisterDate.Month.ToString())
                .Replace("[Day]", RegisterDate.Day.ToString())
                .Replace("[Size]", size.ToString())
                .Replace("[Identity]", Identity)
                .Replace("[Extension]", size.ToLower() != "main" ? "jpg" : Extension)
                .Replace("/", "\\")
                .Replace("[RootDirectory]", System.Web.HttpContext.Current.Request.MapPath("~"))
                .Replace("\\\\", "\\")
            ;
            CreateImageDirectory(path);
            return path;
        }

        public static String CreateImageIdentity()
        {
            return Guid.NewGuid().ToString();
        }

        public static void CreateImageDirectory(string ImagePath)
        {
            if (ImagePath.LastIndexOf('\\') != -1)
            {
                int lIndex = ImagePath.LastIndexOf('\\');
                if (!System.IO.Directory.Exists(ImagePath.Substring(0, lIndex)))
                    System.IO.Directory.CreateDirectory(ImagePath.Substring(0, lIndex));
            }
        }

        public string ErrorMessage = "";
        public Dictionary<string, string> SaveAndGetPaths(string ImagePath, string identity, DateTime registerDate)
        {
            Dictionary<string, string> savedImages = new Dictionary<string, string>();
            string Identity = identity;
            var list = (from x in _imageSetting.Sizes.Split(',').Cast<string>().ToList()
                        let y = new ImageSizeHelper(x)
                        select y).ToList();

            for (int i = 0; i < list.Count(); i++)
            {
                try
                {
                    string Path = GetRealImagePath(_imageSetting.Path, list[i].ToString(), registerDate, Identity, _imageSetting.OutputImageFormat.ToString());
                    CreateImageDirectory(Path);

                    try
                    {
                        CreateImage(list[i], ImagePath)
                            .Save(Path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    }
                    catch
                    {
                    }

                    if (System.IO.File.Exists(Path))
                        savedImages.Add(_imageSetting.Sizes[i].ToString(), Path.Replace(System.Web.HttpContext.Current.Request.MapPath("~"), "~/").Replace("\\", "/"));
                }
                catch (Exception ex)
                {
                    ErrorMessage += ex.Message + "<br/>";
                }
            }
            return savedImages;
        }

        public Image ValidateFileAndGetImage(string imagePath)
        {
            Image img = Image.FromFile(imagePath);
            System.IO.FileInfo file = new System.IO.FileInfo(imagePath);

            List<ImageFormat> formats = new List<ImageFormat>();

            var list = _imageSetting.Extentions.Split(',').Cast<string>().ToList();

            for (int i = 0; i < list.Count; i++)
            {
                switch (list[i].ToLower())
                {
                    case "jpeg":
                    case "jpg": formats.Add(ImageFormat.Jpeg); break;
                    case "png": formats.Add(ImageFormat.Png); break;
                    case "bmp": formats.Add(ImageFormat.Bmp); break;
                    case "gif": formats.Add(ImageFormat.Gif); break;
                    case "tif": formats.Add(ImageFormat.Tiff); break;
                    case "ico": formats.Add(ImageFormat.Icon); break;
                }

            }

            if (_imageSetting.Extentions != "*.*" && !formats.Contains(img.RawFormat))
                throw new Exception("Images Module Dont Support " + img.RawFormat + " Format ");

            if (_imageSetting.MinSize * 1000 > file.Length)
                throw new Exception("Images Module Dont Support  File Size low than " + _imageSetting.MinSize + " kb. ");

            if (_imageSetting.MaxSize * 1000 < file.Length)
                throw new Exception("Images Module Dont Support File Size Greater than " + _imageSetting.MaxSize + " kb. ");

            if (_imageSetting.MinHeight > img.Height)
                throw new Exception("Images Module Dont Support Image Height Low than  " + _imageSetting.MinHeight + " pixel. ");

            if (_imageSetting.MaxHeight < img.Height)
                throw new Exception("Images Module Dont Support Image Height Greater than  " + _imageSetting.MaxHeight + " pixel. ");

            if (_imageSetting.MinWidth > img.Width)
                throw new Exception("Images Module Dont Support Image Width Low than  " + _imageSetting.MinWidth + " pixel. ");

            if (_imageSetting.MaxWidth < img.Width)
                throw new Exception("Images Module Dont Support Image Width Greater than  " + _imageSetting.MaxWidth + " pixel. ");

            if (_imageSetting.MinRatioWithByHeight != null && _imageSetting.MinRatioWithByHeight.Value > ((double)img.Width / (double)img.Height))
                throw new Exception("Images Module Dont Support Image Ratio With By Height Low than  " + _imageSetting.MinRatioWithByHeight.Value + " px . ");

            if (_imageSetting.MaxRatioWithByHeight != null && _imageSetting.MaxRatioWithByHeight.Value < ((double)img.Width / (double)img.Height))
                throw new Exception("Images Module Dont Support Image Ratio With By Height Greater than  " + _imageSetting.MaxRatioWithByHeight.Value + " px. ");

            return img;
        }
        public string GetValidateMessage(System.IO.Stream stream)
        {
            string result = "";

            List<ImageFormat> formats = new List<ImageFormat>();

            var list = _imageSetting.Extentions.Split(',').Cast<string>().ToList();

            for (int i = 0; i < list.Count; i++)
            {
                switch (list[i].ToLower())
                {
                    case "jpeg":
                    case "jpg": formats.Add(ImageFormat.Jpeg); break;
                    case "png": formats.Add(ImageFormat.Png); break;
                    case "bmp": formats.Add(ImageFormat.Bmp); break;
                    case "gif": formats.Add(ImageFormat.Gif); break;
                    case "tif": formats.Add(ImageFormat.Tiff); break;
                    case "ico": formats.Add(ImageFormat.Icon); break;
                }

            }

            if (_imageSetting.MinSize != 0 && _imageSetting.MinSize * 1000 > stream.Length)
                result += "Images Module Dont Support  File Size low than " + _imageSetting.MinSize + " kb. " + "\r\n";

            if (_imageSetting.MaxSize != 0 && _imageSetting.MaxSize * 1000 < stream.Length)
                result += "Images Module Dont Support File Size Greater than " + _imageSetting.MaxSize + " kb. " + "\r\n";

            try
            {
                Image img = Image.FromStream(stream);

                if (_imageSetting.Extentions != "*.*" && !formats.Contains(img.RawFormat))
                    result += "Images Module Dont Support " + img.RawFormat + " Format " + "\r\n";


                if (_imageSetting.MinHeight != 0 && _imageSetting.MinHeight > img.Height)
                    result += "Images Module Dont Support Image Height Low than  " + _imageSetting.MinHeight + " pixel. " + "\r\n";

                if (_imageSetting.MaxHeight != 0 && _imageSetting.MaxHeight < img.Height)
                    result += "Images Module Dont Support Image Height Greater than  " + _imageSetting.MaxHeight + " pixel. " + "\r\n";

                if (_imageSetting.MinWidth != 0 && _imageSetting.MinWidth > img.Width)
                    result += "Images Module Dont Support Image Width Low than  " + _imageSetting.MinWidth + " pixel. " + "\r\n";

                if (_imageSetting.MaxWidth != 0 && _imageSetting.MaxWidth < img.Width)
                    result += "Images Module Dont Support Image Width Greater than  " + _imageSetting.MaxWidth + " pixel. " + "\r\n";

                if (_imageSetting.MinRatioWithByHeight != null && _imageSetting.MinRatioWithByHeight.Value > ((double)img.Width / (double)img.Height))
                    result += "Images Module Dont Support Image Ratio With By Height Low than  " + _imageSetting.MinRatioWithByHeight.Value + " px . " + "\r\n";

                if (_imageSetting.MaxRatioWithByHeight != null && _imageSetting.MaxRatioWithByHeight.Value < ((double)img.Width / (double)img.Height))
                    result += "Images Module Dont Support Image Ratio With By Height Greater than  " + _imageSetting.MaxRatioWithByHeight.Value + " px. " + "\r\n";
            }
            catch
            {
                result += "Images Module Dont Support Format ";
            }

            return result;
        }
    }

    public enum PositionModes
    {
        Fill,
        Fit,
        Stretch,
        Title,
        Center
    }

    public enum ImageFormats
    {
        Jpg,
        Png,
        Gif,
        Bmp
    }

    public class ImageSizeHelper
    {
        public int Width { get; set; }
        public int Height { get; set; }

        public ImageSizeHelper(int width, int height)
        {
            Width = width;
            Height = height;
        }
        public ImageSizeHelper(string stringValue)
        {
            string[] splitedvalue = stringValue.Split('x');
            if (splitedvalue.Length == 2)
            {
                Width = int.Parse(splitedvalue[0]);
                Height = int.Parse(splitedvalue[1]);
            }
        }
        public override string ToString()
        {
            return Width.ToString() + "x" + Height.ToString();
        }
    }
}
