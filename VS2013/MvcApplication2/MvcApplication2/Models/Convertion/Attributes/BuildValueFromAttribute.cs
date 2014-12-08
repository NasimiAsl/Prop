//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace System
{
    [AttributeUsage(AttributeTargets.Property)]
    public class BuildValueFromAttribute : Attribute
    {
        public string Pattern { get; set; }

        public BuildValueFromAttribute(string pattern)
        {
            Pattern = pattern;
        }

        public List<string> Properties
        {
            get
            {
                return Pattern.Split('+').Cast<string>().ToList();
            }
        }
    }
}
