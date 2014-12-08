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
    public class PartialTemplateAttribute : RenderTemplateAttribute
    {
        /// <summary>
        /// 
        ///     Binding Partial 
        ///     Model Binding in Runtime from RenderItem
        /// 
        /// </summary>
        /// <param name="partialName"></param>
        public PartialTemplateAttribute(string partialName)
            : base()
        {
            TemplateValue = (new PartialItem() { PartialName = partialName });
        }
    }
}
