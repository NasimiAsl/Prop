//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//
//      It is maybe Used For any class (View, Partial, ...) then
//      Add To Global System namespace (No Need Add reference in class header...)
// 
namespace System
{
    /// <summary>
    /// Conversion Helper 
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class IComExclusion : Attribute
    {
        public ConversionMode Mode { get; set; }
        public IComExclusion(ConversionMode mode)
        {
            Mode = mode;
        }
    }

    public enum ConversionMode
    {
        Assign,
        Build
    }
}
