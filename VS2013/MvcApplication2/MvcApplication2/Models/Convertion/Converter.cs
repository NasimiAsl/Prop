//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace System
{
    /// <summary>
    /// 
    /// </summary>
    public class Converter
    {
        //.ctor
        public Converter()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>
        /// <param name="destinationDefault"></param>
        public Converter(object source, object destinationDefault)
        {
            Source = source;
            DestinationDefault = destinationDefault;
        }

        /// <summary>
        /// 
        /// </summary>
        public object Source { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public object DestinationDefault { get; set; }

        /// <summary>
        /// onverts to boolean
        /// </summary>
        public bool BooleanValue
        {
            get
            {
                var value = NormalizeSource();

                bool convertedValue = false;
                if (bool.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (bool)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to byte
        /// </summary>
        public byte ByteValue
        {
            get
            {
                var value = NormalizeSource();

                byte convertedValue = 0;
                if (byte.TryParse(GetIntegerNumberFromStringValue(value), out convertedValue))
                    return convertedValue;
                return (byte)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to integer
        /// </summary>
        public int IntegerValue
        {
            get
            {
                var value = NormalizeSource();

                int convertedValue = 0;
                if (int.TryParse(GetIntegerNumberFromStringValue(value), out convertedValue))
                    return convertedValue;
                return (int)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to long
        /// </summary>
        public long LongValue
        {
            get
            {
                var value = NormalizeSource();

                long convertedValue = 0;
                if (long.TryParse(GetIntegerNumberFromStringValue(value), out convertedValue))
                    return convertedValue;
                return (long)DestinationDefault;
            }
        }

        /// <summary>
        /// Converts a string containing integer value to integer type
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetIntegerNumberFromStringValue(object value)
        {
            return Regex.IsMatch(String.Format("{0:F20}", value), "^[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?$") ? value.ToString().Split('.')[0] : value.ToString();
        }

        /// <summary>
        /// converts to single
        /// </summary>
        public Single SingleValue
        {
            get
            {
                var value = NormalizeSource();

                Single convertedValue = 0;
                if (Single.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (Single)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to float
        /// </summary>
        public float FloatValue
        {
            get
            {
                var value = NormalizeSource();

                float convertedValue = 0;
                if (float.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (float)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to double
        /// </summary>
        public double DoubleValue
        {
            get
            {
                var value = NormalizeSource();

                double convertedValue = 0;
                if (double.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (double)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to DateTime
        /// </summary>
        public DateTime DateTimeValue
        {
            get
            {
                var value = NormalizeSource();

                DateTime convertedValue = new DateTime();
                if (DateTime.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (DateTime)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to bool?
        /// </summary>
        public bool? NullableBooleanValue
        {
            get
            {
                var value = NormalizeSource();

                bool convertedValue = false;
                if (bool.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (bool?)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to byte?
        /// </summary>
        public byte? NullableByteValue
        {
            get
            {
                var value = NormalizeSource();

                byte convertedValue = 0;
                if (byte.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (byte?)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to int?
        /// </summary>
        public int? NullableIntegerValue
        {
            get
            {
                var value = NormalizeSource();

                int convertedValue = 0;
                if (int.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (int?)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to long?
        /// </summary>
        public long? NullableLongValue
        {
            get
            {
                var value = NormalizeSource();

                long convertedValue = 0;
                if (long.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (long?)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to float?
        /// </summary>
        public float? NullableFloatValue
        {
            get
            {
                var value = NormalizeSource();

                float convertedValue = 0;
                if (float.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (float?)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to double?
        /// </summary>
        public double? NullableDoubleValue
        {
            get
            {
                var value = NormalizeSource();

                double convertedValue = 0;
                if (double.TryParse(value.ToString(), out convertedValue))
                    return convertedValue;
                return (double?)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to guid
        /// </summary>
        public Guid GuidValue
        {
            get
            {
                var value = NormalizeSource();

                Guid convertedValue = new Guid();
                if (Guid.TryParse(value.ToString().Replace("_", "-"), out convertedValue))
                    return convertedValue;
                return (Guid)DestinationDefault;
            }
        }

        /// <summary>
        /// converts to single 
        /// </summary>
        public string StringValue
        {
            get
            {
                var value = NormalizeSource();

                return value.ToString();
            }
        }

        /// <summary>
        /// converts to an impmelemtantion of BaseCommunication
        /// </summary>
        public ICommunication CommunicationValue(Type targetType = null)
        {
            var sourceValue = NormalizeSource();

            // extracts source type
            Type sourceType = sourceValue.GetType();

            var result = new CommunicationBase();

            if (IsOfExclusiveTypes(sourceType))
            {
                result.PropertyType = CommunicationBase.PropertyTypes.Object;
                return result;
            }
            else if (sourceType == typeof(ICommunication) ||
                sourceType == typeof(CommunicationBase))
            {
                result.PropertyType = CommunicationBase.PropertyTypes.Communication;
                return result;
            }


            if (sourceType.IsEnum)
            {
                result.PropertyType = CommunicationBase.PropertyTypes.Enum;
                return result;
            }


            if (sourceType.IsArray)
            {
                result.PropertyType = CommunicationBase.PropertyTypes.Array;
                ConvertArrayToICommunicationList(sourceValue, result);
                return result;
            }

            if (sourceType.IsGenericType)
            {
                if (sourceType.Name.Contains("List"))
                {
                    result.PropertyType = CommunicationBase.PropertyTypes.List;
                    ConvertListToICommunicationList(sourceValue, result);
                    return result;
                }
                if (sourceType.Name.Contains("Dictionary"))
                {
                    result.PropertyType = CommunicationBase.PropertyTypes.Dictionary;
                    ConvertListToICommunicationDictionary(sourceValue, result);
                    return result;
                }
                else if (!sourceType.Name.Contains("AnonymousType"))
                {
                    result.PropertyType = CommunicationBase.PropertyTypes.Anonymous;
                    return result;
                }
            }

            foreach (var flaggedProperty in GetCommunicationFlaggedProperties(sourceType, ConversionMode.Assign, targetType))
            {
                if (sourceType.ToString() != "System.RuntimeType")
                    ConvertFlaggedPropertyToICommunication(sourceValue, result, flaggedProperty);
            }
            result.PropertyType = CommunicationBase.PropertyTypes.Class;
            return result;

        }

        private static void ConvertFlaggedPropertyToICommunication(object sourceValue, CommunicationBase result, PropertyInfo flaggedProperty)
        {
            var flaggedPropertyValue = flaggedProperty.GetValue(sourceValue, null);

            var iComBase = (CommunicationBase)flaggedPropertyValue.To<ICommunication>(new CommunicationBase());

            var flaggedPropertyCustomAttributes = flaggedProperty.GetCustomAttributes(typeof(AssignValueToAttribute), true).Select(x => (AssignValueToAttribute)x).FirstOrDefault();

            if (flaggedPropertyCustomAttributes != null && flaggedPropertyCustomAttributes.Pattern != flaggedProperty.Name)
            {
                AssignToPatternRelatedProperty(result, flaggedProperty, flaggedPropertyValue, iComBase, flaggedPropertyCustomAttributes);
            }
            else
            {
                iComBase.Name = flaggedProperty.Name;

                if (iComBase.Count == 0)
                    iComBase.Value = flaggedPropertyValue;

                iComBase.Property = flaggedProperty;
                result.Add(iComBase);
            }
        }

        private static void AssignToPatternRelatedProperty(CommunicationBase result, PropertyInfo flaggedProperty, object flaggedPropertyValue, CommunicationBase iComBase, AssignValueToAttribute flaggedPropertyCustomAttributes)
        {
            if (result.All(x => x.Name != flaggedPropertyCustomAttributes.Pattern))
            {
                iComBase.Name = flaggedPropertyCustomAttributes.Pattern;
                if (iComBase.Count == 0)
                    iComBase.Value = flaggedPropertyValue;
                iComBase.Property = flaggedProperty;
                result.Add(iComBase);
            }
            else
            {
                var firstOrDefault
                    = result.FirstOrDefault(x => x.Name == flaggedPropertyCustomAttributes.Pattern);

                if (firstOrDefault != null)
                    firstOrDefault.Value += CommunicationBase.PatternJoint + flaggedPropertyValue;
            }
        }

        private static void ConvertListToICommunicationList(object sourceValue, CommunicationBase result)
        {
            try { if (sourceValue == null || ((IEnumerable)sourceValue).Cast<object>().ToList().Count == 0) return; }
            catch
            {
                return;
            }
            foreach (var listElement in ((IEnumerable)sourceValue).Cast<object>().ToList())
            {
                var iComBase = (CommunicationBase)listElement.To<ICommunication>(new CommunicationBase());

                iComBase.Name = "List";
                if (iComBase.Count == 0)
                    iComBase.Value = listElement;

                iComBase.Property = null;

                result.Add(iComBase);
            }


        }

        private static void ConvertListToICommunicationDictionary(object sourceValue, CommunicationBase result)
        {
            try { if (sourceValue == null || ((IDictionary)sourceValue).Count == 0) return; }
            catch
            {
                return;
            }
            var dic = ((IDictionary)sourceValue);
            foreach (var key in dic.Keys)
            {
                var iComBase = new CommunicationBase();


                iComBase.Name = "Dic";
                var i = (CommunicationBase)dic[key].To<ICommunication>(new CommunicationBase());

                if (i.Count > 0)
                    iComBase.Value = key.ToString() + ":" + i;
                else
                    iComBase.Value = key.ToString() + ":" + dic[key];

                iComBase.Property = null;

                result.Add(iComBase);
            }
        }

        private static void ConvertArrayToICommunicationList(object sourceValue, CommunicationBase result)
        {
            foreach (var arrayElement in (object[])sourceValue)
            {
                var iComBase = (CommunicationBase)arrayElement.To<ICommunication>(new CommunicationBase());

                iComBase.Name = "Array";
                if (iComBase.Count == 0)
                    iComBase.Value = arrayElement;
                iComBase.Property = null;

                result.Add(iComBase);
            }
        }

        /// <summary>
        /// checks if a type is of types we are concerned with
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static bool IsOfExclusiveTypes(Type type)
        {
            return (!type.IsClass && !type.IsEnum) ||
                                type == typeof(System.Int16) ||
                                type == typeof(System.Int32) ||
                                type == typeof(System.Int64) ||
                                type == typeof(System.Byte) ||
                                type == typeof(System.Double) ||
                                type == typeof(System.Char) ||
                                type == typeof(System.String) ||
                                type == typeof(Guid) ||
                                type == typeof(System.Single) ||
                                type == typeof(System.DateTime) ||

                //  type == typeof(IEnumerable<object>) ||
                //  type == typeof(List<object>) ||

                                type == typeof(string);
        }

        public static object ToOfExclusiveTypes(string value, Type type)
        {
            return (!type.IsClass && !type.IsEnum) ||
                                type == typeof(System.Int16) ||
                                type == typeof(System.Int32) ||
                                type == typeof(System.Int64) ||
                                type == typeof(System.Byte) ||
                                type == typeof(System.Double) ||
                                type == typeof(System.Char) ||
                                type == typeof(System.String) ||
                                type == typeof(Guid) ||
                                type == typeof(System.Single) ||
                                type == typeof(System.DateTime) ||
                //  type == typeof(IEnumerable<object>) ||
                //  type == typeof(List<object>) ||

                                type == typeof(string);
        }

        public static Dictionary<string, List<PropertyInfo>> CachePropertyInfos { get; set; }


        /// <summary>
        /// returns a list of object properties that have been flaged by a specific Attribute
        /// </summary>
        /// <param name="intendedType"></param>
        /// <param name="mode"></param>
        /// <returns></returns>
        public static List<PropertyInfo> GetCommunicationFlaggedProperties(Type intendedType, ConversionMode mode, Type targetType = null)
        {
            if (CachePropertyInfos == null) CachePropertyInfos = new Dictionary<string, List<PropertyInfo>>();

            var key = intendedType.ToString() + (targetType == null ? "" : targetType.ToString()) + mode.ToString();
            if (CachePropertyInfos.Keys.Contains(key))
            {
                return CachePropertyInfos[key];
            }

            if (targetType == null)
            {
                var result = (from x in intendedType.GetProperties()
                              let y = (from z in x.GetCustomAttributes(typeof(IComExclusion), true) where ((IComExclusion)z).Mode == mode select z).Count()
                              where y == 0
                              select x).ToList();

                CachePropertyInfos.Add(key, result);

                return result;
            }
            else
            {
                var result = (from x in intendedType.GetProperties()
                              join c in targetType.GetProperties() on x.Name equals c.Name
                              let y = (from z in x.GetCustomAttributes(typeof(IComExclusion), true) where ((IComExclusion)z).Mode == mode select z).Count()
                              let y1 = (from z1 in c.GetCustomAttributes(typeof(IComExclusion), true) where ((IComExclusion)z1).Mode == mode select z1).Count()

                              where y == 0 && y1 == 0
                              select x).ToList();

                CachePropertyInfos.Add(key, result);

                return result;

            }
        }

        /// <summary>
        /// populates properties of an object given as parameter
        /// </summary>
        /// <param name="ix"></param>
        /// <param name="respectiveObject"></param>
        /// <returns></returns>
        public static object PopulateRespectiveObjectValue(CommunicationBase ix, object respectiveObject)
        {
            if (respectiveObject == null) return null;
            var respectiveObjectType = respectiveObject.GetType();

            foreach (var property in GetCommunicationFlaggedProperties(respectiveObjectType, ConversionMode.Build))
            {
                var buildOptions = property.GetCustomAttributes(typeof(BuildValueFromAttribute), true)
                    .Select(x => (BuildValueFromAttribute)x).FirstOrDefault();

                if (buildOptions != null && buildOptions.Pattern != property.Name)
                {
                    if (buildOptions.Properties.Count == 1)
                    {
                        var firstOrDefault = ix.FirstOrDefault(x => x.Name == buildOptions.Pattern);

                        if (firstOrDefault != null)
                            property.SetValue(respectiveObject, firstOrDefault.Value, null);
                    }
                    else
                    {
                        var value = "";
                        foreach (var bProperties in buildOptions.Properties)
                        {
                            var firstOrDefault = ix.FirstOrDefault(x => x.Name == buildOptions.Pattern);
                            if (firstOrDefault != null)
                                value += CommunicationBase.PatternJoint + firstOrDefault.Value.ToString();
                        }

                        if (value != "")
                            property.SetValue(respectiveObject, value.Substring(CommunicationBase.PatternJoint.Length), null);
                    }
                }
                else
                {
                    var subIx = ix.FirstOrDefault(x => x.Name == property.Name);

                    if (subIx != null && property.CanWrite)
                    {
                        if (subIx.Value != null && IsOfExclusiveTypes(property.PropertyType))
                        {
                            try
                            {
                                property.SetValue(respectiveObject, subIx.Value.ToCurrentType(), null);
                            }
                            catch
                            {
                                if (property.PropertyType == typeof(bool))
                                {
                                    property.SetValue(respectiveObject, (subIx.Value.ToString().ToLower() != "true" ? false : true), null);
                                }
                                else if (property.PropertyType == typeof(int))
                                {
                                    property.SetValue(respectiveObject, (subIx.Value.ToString().ToLower() != "" ? subIx.Value.To<int>(0) : 0), null);
                                } 
                                else property.SetValue(respectiveObject, subIx.Value.ToString(), null);
                            }
                        }
                        else if (subIx.Value != null && property.PropertyType == typeof(System.Object) && !subIx.Value.ToString().StartsWith("{"))
                        {
                            property.SetValue(respectiveObject, subIx.Value.ToCurrentType(), null);
                        }
                        else if (property.PropertyType.IsGenericType && property.PropertyType.Name.Contains("List"))
                        {
                            var gtype = property.PropertyType.GetGenericArguments()[0];

                            var listInstance = (IList)typeof(List<>)
                               .MakeGenericType(gtype)
                               .GetConstructor(Type.EmptyTypes)
                               .Invoke(null);

                            foreach (var item in (CommunicationBase)subIx)
                            {
                                try
                                {
                                    if (gtype.IsEnum)
                                    {
                                        var it = Enum.Parse(gtype, item.Value.ToString());

                                        listInstance.Add(it);
                                    }
                                    else if (gtype.IsClass && !gtype.FullName.StartsWith("System"))
                                    {
                                        var it = item.Value.ToString().JsonTo(gtype.Assembly.CreateInstance(gtype.FullName));

                                        listInstance.Add(it);
                                    }
                                    else
                                        listInstance.Add(item.Value);
                                }
                                catch
                                {
                                }
                            }

                            property.SetValue(respectiveObject, listInstance, null);

                        }
                        else if (property.PropertyType.IsGenericType && property.PropertyType.Name.Contains("Dictionary"))
                        {
                            var keyType = property.PropertyType.GetGenericArguments()[0];
                            var valType = property.PropertyType.GetGenericArguments()[1];




                            var DicInstance = (IDictionary)typeof(Dictionary<,>)
                               .MakeGenericType(keyType, valType)
                               .GetConstructor(Type.EmptyTypes)
                               .Invoke(null);

                            foreach (var item in (CommunicationBase)subIx)
                            {
                                try
                                {
                                    var parts = JsonBlockExtractor.FirstRestSplitter(
                                        item.Value.ToString(), new string[] { ":" });

                                    dynamic key = "";
                                    dynamic val = "";


                                    if (keyType.IsEnum)
                                        key = Enum.Parse(keyType, parts[0]);
                                    else if (keyType.IsClass && !keyType.FullName.StartsWith("System"))
                                        key = parts[0].JsonTo(
                                          keyType.Assembly.CreateInstance(keyType.FullName));
                                    else
                                        key = parts[0];

                                    if (valType.IsEnum)
                                        val = Enum.Parse(valType, parts[1]);
                                    else if (valType.IsClass && !valType.FullName.StartsWith("System"))
                                        val = parts[1].JsonTo(
                                          valType.Assembly.CreateInstance(valType.FullName));
                                    else val = parts[1];



                                    DicInstance.Add(key, val);

                                }
                                catch
                                {
                                }
                            }

                            property.SetValue(respectiveObject, DicInstance, null);
                        }
                        else if (property.PropertyType.IsArray)
                        {

                        }
                        else if (property.PropertyType.IsEnum)
                        {
                            if (((CommunicationBase)subIx).PropertyType == CommunicationBase.PropertyTypes.Enum)
                            {
                                try
                                {
                                    var val = Enum.Parse(property.PropertyType, ((CommunicationBase)subIx)[0].Value.ToString()
                                        .Replace("'", "")
                                        .Replace("\"", ""));

                                    property.SetValue(respectiveObject, val, null);
                                }
                                catch
                                {
                                    var val = Enum.Parse(property.PropertyType, ((CommunicationBase)subIx).Value.ToString()
                                       .Replace("'", "")
                                       .Replace("\"", ""));

                                    property.SetValue(respectiveObject, val, null);
                                }
                            }
                            else
                            {
                                var val = Enum.Parse(property.PropertyType, subIx.Value.ToString()
                                    .Replace("'", "")
                                    .Replace("\"", ""));

                                property.SetValue(respectiveObject, val, null);
                            }
                        }
                        else
                        {
                            if (((CommunicationBase)subIx).PropertyType == CommunicationBase.PropertyTypes.Class)
                            {
                                property.SetValue(
                                    respectiveObject,
                                    property.PropertyType.Assembly.CreateInstance(property.PropertyType.FullName)
                                    , null);
                            }

                            PopulateRespectiveObjectValue(
                                (CommunicationBase)ix.Where(x => x.Name == property.Name)
                                .FirstOrDefault(), property.GetValue(respectiveObject, null));

                        }
                    }
                }
            }

            return respectiveObject;
        }

        /// <summary>
        /// corrects and normalizes the returned value if source is null
        /// </summary>
        /// <returns></returns>
        private object NormalizeSource()
        {
            var sourceValue = Source;

            if (sourceValue == null && DestinationDefault == null)
                return string.Empty;

            else if (sourceValue == null || (sourceValue is string && sourceValue.ToString().Trim() == string.Empty))
                sourceValue = DestinationDefault;

            return sourceValue;
        }

      
    }
}
