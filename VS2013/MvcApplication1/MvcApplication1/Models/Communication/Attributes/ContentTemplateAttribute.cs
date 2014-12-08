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
    public class ContentTemplateAttribute : RenderTemplateAttribute
    {
        /// <summary>
        /// 
        ///     Binding Content 
        ///     Model Binding in Runtime from RenderItem
        /// 
        /// </summary>
        /// <param name="template">when Rendering Replace ViewModel values to Properties #[PropertyName] <=> ViewModel.PropertyName.ToString() </param>
        public ContentTemplateAttribute(string template)
            : base()
        {
            TemplateValue = (new ContentItem() { Template = template });
        }
    }
}
