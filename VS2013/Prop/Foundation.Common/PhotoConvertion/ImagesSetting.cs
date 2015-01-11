//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace PhotoConvertion.Media
{
    public class ImagesSetting
    {
        public ImagesSetting(string name = "Default")
        {
            Name = name;
            Transparency = true;
            MinSize = 0;
            MaxSize = 2000;
            MinWidth = 0;
            MaxWidth = 2048;
            MinHeight = 0;
            MaxHeight = 2048;
            MinRatioWithByHeight = 0.01;
            MaxRatioWithByHeight = 100.0;

            Path = "[RootDirectory]\\Images\\[Year]\\[Month]\\[Day]\\[Size]\\[Identity].[Extension]";

            Sizes = "32x32,64x64,96x96,256x256";
            Background = "{BackColor=#fff}";
            PositionMode = "Fill";

            Extentions = "jpg,png,txt";

            FixSourceExtention = true;
        }

        public string Name { get; set; }

        public bool Transparency { get; set; }
        public int MinSize { get; set; }
        public int MaxSize { get; set; }
        public int MinWidth { get; set; }
        public int MaxWidth { get; set; }
        public int MinHeight { get; set; }
        public int MaxHeight { get; set; }
        public double? MinRatioWithByHeight { get; set; }
        public double? MaxRatioWithByHeight { get; set; }
        public int DirectoryMaxSize { get; set; }
        public string Copyright { get; set; }
        public string Watermark { get; set; }
        public string Path { get; set; }

        public bool FixSourceExtention { get; set; }

        /// <summary>
        /// png,jpg,...
        /// </summary>

        public string Extentions { get; set; }
        public string PositionMode { get; set; }

        /// <summary>
        /// 100x100,200x200,...
        /// </summary>

        public string Sizes { get; set; }
        public bool ShowSelectionPanel { get; set; }
        public string OutputImageFormat { get; set; }
        public string Background { get; set; }
        public int SettingId { get; set; }
    }


}