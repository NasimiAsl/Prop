//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

//
//      It is maybe Used For any class (convertion class , xinfo ,View, Partial, ...) then
//      Add To Global System namespace (No Need Add reference in class header...)
// 
namespace System //NiazeroozFoundation.Common.Contracts
{
    //
    //        Represent an intermediate class between the two objects.
    //        Used in the middle layer
    // 

    public interface ICommunication
    {
        /// <summary>
        /// 
        ///     Property Name [The title is a reference Value.]
        ///     This field Used For Find Currect Proprty.
        /// 
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// 
        ///     Property Value
        ///     Type is Primitive Types(bool,byte,int ,...,Guid,string) or Enum's String Values  
        /// 
        /// </summary>

        object Value { get; set; }

        /// <summary>
        /// 
        ///     Property Reflection Helper Field
        ///     Just Given Primitive Type or Enum String Values  
        /// 
        /// </summary>
        PropertyInfo Property { get; set; }

        string ToString();
    }
}
