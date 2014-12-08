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
    public class RenderTemplateAttribute : Attribute
    {

        public RenderTemplateAttribute()
        {
        }

        public RenderItem TemplateValue { get; set; }

    }
}
