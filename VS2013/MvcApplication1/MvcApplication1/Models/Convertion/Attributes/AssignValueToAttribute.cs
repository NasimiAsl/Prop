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
    public class AssignValueToAttribute : Attribute
    {
        public string Pattern { get; set; }

        public AssignValueToAttribute(string pattern)
        {
            Pattern = pattern;
        }       
    }
}
