using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace System
{
    public class Adaptor
    {

        public const string ProfilerKey = "pAdaptor";

        public CommunicationBase AssignToCom<In>(In input)
        {
            return (new CommunicationBase());
        }

        public bool isExclusive<RequestType>(RequestType type)
        {
            if (type == null) return false;

            var outType = (type != null ? type.GetType() : typeof(RequestType));

            if (outType.Name.Contains("System.Object"))
            {
                if (outType.IsClass || outType.IsEnum)
                    return false;
                else
                    return true;
            }

            if (outType == typeof(string) || outType == typeof(String) || IsFlag(outType) || IsInteger(outType) || IsFloatNumber(outType)
                || outType == typeof(DateTime) || outType == typeof(Guid))
            {
                return true;
            }

            return false;
        }

        public static bool IsFlag(Type outType)
        {
            return outType == typeof(bool) || outType == typeof(Boolean);
        }

        public static bool IsFloatNumber(Type outType)
        {
            return outType == typeof(float) || outType == typeof(double) || outType == typeof(decimal) ||
                outType == typeof(Decimal) || outType == typeof(Double) || outType == typeof(Single);
        }

        public static bool IsInteger(Type outType)
        {
            return outType == typeof(byte) || outType == typeof(short) || outType == typeof(int) ||
                outType == typeof(long) || outType == typeof(Int16) || outType == typeof(Int32) || outType == typeof(Int64);
        }

        public bool IsExclusiveType(Type type)
        {
            if (type.FullName.Contains("System.String"))
                return true;

            var obj = type.Assembly.CreateInstance(type.FullName);
            return isExclusive(obj);
        }

        public object CreateInstance(Type type)
        {
            object ob;
            if (type.FullName.Contains("System.String"))
                ob = "";
            else
                ob = type.Assembly.CreateInstance(type.FullName);
            return ob;
        }

        public Out BuildFromCom<Out>(CommunicationBase com, Out oldFilledProperty, Type targetType = null)
        {
            //Profiler.SetPoint(Adaptor.ProfilerKey, "start Build");

            if (com == null || (com.Count == 0 && com.Value == null)) return oldFilledProperty;

            var outType = (oldFilledProperty != null ? oldFilledProperty.GetType() : typeof(Out));

            if (oldFilledProperty == null)
                oldFilledProperty = (Out)CreateInstance(outType);

            if (IsExclusiveType(outType) && com.Count == 0)
            {
                return (Out)BuildExclusiveFromCom(com, oldFilledProperty);

                // Boxing  and Unboxing 
            }
            //else if (outType.IsGenericType && outType.Name.Contains("List"))
            //{
            //    // Under constructions : .class:List<> 

            //}
            //else if (outType.IsGenericType && outType.Name.Contains("Dictionary"))
            //{
            //    // Under constructions : .class:Dictionary<,> 
            //}
            else if (outType.IsEnum)
            {
                return (Out)BuildEnumFromCom((CommunicationBase)com, oldFilledProperty);
            }
            else if (outType.IsClass)
            {
                var properties = GetAdaptorProperties(outType, targetType);
                //Profiler.SetPoint(Adaptor.ProfilerKey, "Get Property");

                if (properties.Count > 0)
                {
                    foreach (var property in properties)
                    {
                        #region Fetch Data To Instance

                        var subIx = com.FirstOrDefault(x => x.Name == property.Name);
                        if (subIx != null)
                        {
                            object ob = CreateInstance(property.PropertyType);

                            if (subIx.Value != null && isExclusive(ob))
                            {
                                var obj = BuildExclusiveFromCom((CommunicationBase)subIx, ob);

                                property.SetValue(oldFilledProperty, obj, null);
                            }
                            else if (property.PropertyType.IsGenericType && property.PropertyType.Name.Contains("List"))
                            {
                                var gtype = property.PropertyType.GetGenericArguments()[0];

                                var obj = BuildListFromCom((CommunicationBase)subIx, gtype);

                                property.SetValue(oldFilledProperty, obj, null);
                            }
                            else if (property.PropertyType.IsGenericType && property.PropertyType.Name.Contains("Dictionary"))
                            {
                                var keyType = property.PropertyType.GetGenericArguments()[0];
                                var valType = property.PropertyType.GetGenericArguments()[1];

                                var obj = BuildDictionaryFromCom((CommunicationBase)subIx, keyType, valType);

                                property.SetValue(oldFilledProperty, obj, null);
                            }
                            else if (property.PropertyType.IsEnum)
                            {
                                var obj = BuildEnumFromCom((CommunicationBase)subIx, ob);

                                property.SetValue(oldFilledProperty, obj, null);
                            }
                            else if (property.PropertyType.IsClass) // try like Class
                            {
                                var obj = BuildFromCom((CommunicationBase)subIx, ob);

                                property.SetValue(oldFilledProperty, obj, null);
                            }
                            else
                            {
                                // Wrong Type Requested For Build Action
                            }

                            //Profiler.SetPoint(Adaptor.ProfilerKey, "Fetch " + property.Name);
                        }
                        #endregion
                    }
                }
            }

            return oldFilledProperty;
        }

        public Out BuildFromCom<Out>(CommunicationBase com)
        {
            Out oldFilledProperty;

            var outType = (typeof(Out));

            if (IsExclusiveType(outType))
                oldFilledProperty = (Out)(new Object());
            else
                oldFilledProperty = (Out)outType.Assembly.CreateInstance(
                outType.Assembly.FullName);

            return BuildFromCom(com, oldFilledProperty);
        }

        public object BuildExclusiveFromCom<OutType>(CommunicationBase com, OutType defaultValue)
        {
            if (com.Value == null) return null;
            var outType = (defaultValue != null ? defaultValue.GetType() : typeof(OutType));
            var inType = com.Value.GetType();

            if (outType.FullName.Contains("System.String"))
                return (OutType)com.Value;

            if (inType.FullName.Contains("System.String"))
            {
                object ob;
                Int64 int64;
                Decimal dsm;
                DateTime date;
                Guid guid;
                if (IsFlag(outType))
                {
                    if (com.Value.ToString() == "true" || com.Value.ToString() == "True") ob = true;
                    else ob = false;
                }
                else if (IsInteger(outType))
                {
                    if (Int64.TryParse(com.Value.ToString(), out int64)) ob = int64;
                    else int64 = 0;

                    if (outType == typeof(byte)) return (byte)int64;
                    else if (outType == typeof(short)) return (short)int64;
                    else if (outType == typeof(int)) return (int)int64;
                    else if (outType == typeof(long)) return (long)int64;
                    else if (outType == typeof(Int16)) return (Int16)int64;
                    else if (outType == typeof(Int32)) return (Int32)int64;
                    else return (Int64)int64;
                }
                else if (IsFloatNumber(outType))
                {
                    if (Decimal.TryParse(com.Value.ToString(), out dsm)) ob = dsm;
                    else dsm = 0;

                    if (outType == typeof(float)) return (float)dsm;
                    else if (outType == typeof(double)) return (double)dsm;
                    else if (outType == typeof(Decimal)) return (Decimal)dsm;
                    else if (outType == typeof(Single)) return (Single)dsm;
                    else if (outType == typeof(Double)) return (Double)dsm;
                    else return (decimal)dsm;
                }
                else if (outType == typeof(DateTime))
                {
                    if (DateTime.TryParse(com.Value.ToString(), out date)) ob = date;
                    else ob = defaultValue;
                }
                else if (outType == typeof(Guid))
                {
                    if (Guid.TryParse(com.Value.ToString(), out guid)) ob = guid;
                    else ob = defaultValue;
                }
                else
                    ob = defaultValue;

                return (OutType)ob;
            }

            //if  ((IsInteger(outType) && IsInteger(inType)) ||  (IsFloatNumber(outType) && IsFloatNumber(inType)) ||
            //    (IsInteger(outType) && IsFloatNumber(inType)) || (IsFloatNumber(outType) && IsInteger(inType)))

            return (OutType)com.Value;
        }

        public object BuildExclusiveFromObj(object value)
        {
            if (value == null) return null;
            var inType = value.GetType();

            if (inType.FullName.Contains("System.String"))
            {
                object ob;
                Int64 int64;
                Decimal dsm;
                DateTime date;
                Guid guid;
                if (value.ToString() == "false" || value.ToString() == "False")
                    return false;
                else if (value.ToString() == "true" || value.ToString() == "True")
                    return true;


                Regex rg1 = new Regex(@"^\d+$");
                var val = value.ToString();
                var negative = 1;
                if (val.Length > 0 && val[0] == '-') negative = -1;
                val = val.Replace("+", "").Replace("-", "").ToString();
                var parts = val.Split(new string[] { ".", "e" }, StringSplitOptions.None);
                if (rg1.IsMatch(val))
                {
                    if (Int64.TryParse(val, out int64)) return int64 * negative;
                    else return getIntegerNumberUnpacked(parts, typeof(Int64), negative);
                }
                else if (rg1.IsMatch(val) ||
                   (/*12e+20 || 1.2*/ (parts.Length == 2 && rg1.IsMatch(parts[0]) && rg1.IsMatch(parts[1])) ||
                    /*1.2e+20*/(val.IndexOf(".") * val.IndexOf("e") > 0 && parts.Length == 3 && rg1.IsMatch(parts[0]) &&
                   rg1.IsMatch(parts[1]) && rg1.IsMatch(parts[2]))))
                {
                    if (Decimal.TryParse(val, out dsm)) return dsm * negative;
                    else return getFloatNumberUnpacked(parts, typeof(decimal), negative);
                }
                if (DateTime.TryParse(val.ToString(), out date)) return date;
                else if (Guid.TryParse(val.ToString(), out guid)) return guid;
            }
            return value;
        }

        private object getIntegerNumberUnpacked(string[] parts, Type outputType, int negative = 1)
        {
            long g = 0;
            if (parts.Length == 3)
            {
                var e = Math.Pow(10, int.Parse(parts[2]));
                var d = double.Parse(parts[0] + "." + parts[1]);

                g = (long)(d * e);
            }
            else if (parts.Length == 2)
            {
                var d = double.Parse(parts[0] + "." + parts[1]);

                g = (long)(d);
            }
            else
            {
                var d = double.Parse(parts[0]);

                g = (long)(d);
            }
            g = g * negative;

            if (outputType == typeof(byte)) return (byte)g;
            else if (outputType == typeof(short)) return (short)g;
            else if (outputType == typeof(int)) return (int)g;
            else if (outputType == typeof(long)) return (long)g;
            else if (outputType == typeof(Int16)) return (Int16)g;
            else if (outputType == typeof(Int32)) return (Int32)g;
            else return (Int64)g;
        }

        private object getFloatNumberUnpacked(string[] parts, Type outputType, int negative = 1)
        {
            double g = 0;
            if (parts.Length == 3)
            {
                var e = Math.Pow(10, int.Parse(parts[2]));
                var d = double.Parse(parts[0] + "." + parts[1]);

                g = (double)(d * e);
            }
            else if (parts.Length == 2)
            {
                var d = double.Parse(parts[0] + "." + parts[1]);

                g = (double)(d);
            }
            else
            {
                var d = double.Parse(parts[0]);

                g = (double)(d);
            }
            g = g * negative;

            if (outputType == typeof(float)) return (float)g;
            else if (outputType == typeof(double)) return (double)g;
            else if (outputType == typeof(Decimal)) return (Decimal)g;
            else if (outputType == typeof(Single)) return (Single)g;
            else if (outputType == typeof(Double)) return (Double)g;

            else return (decimal)g;
        }

        public IList BuildListFromCom(CommunicationBase com, Type gType)
        {
            // Profiler.SetPoint(Adaptor.ProfilerKey, "s list " + gType.Name);
            var listInstance = (IList)typeof(List<>)
               .MakeGenericType(gType)
               .GetConstructor(Type.EmptyTypes)
               .Invoke(null);

            foreach (var item in com)
            {
                object ob = CreateInstance(gType);
                listInstance.Add(BuildFromCom((CommunicationBase)item, ob));
            }

            //  Profiler.SetPoint(Adaptor.ProfilerKey, "e list");
            return listInstance;
        }

        public IDictionary BuildDictionaryFromCom(CommunicationBase com, Type keyType, Type valType)
        {
            var DicInstance = (IDictionary)typeof(Dictionary<,>)
               .MakeGenericType(keyType, valType)
               .GetConstructor(Type.EmptyTypes)
               .Invoke(null);

            foreach (var item in com)
            {
                var parts = JsonBlockExtractor.FirstRestSplitter(
                    item.Value.ToString(), new string[] { ":" });

                var key = CreateInstance(keyType);
                var val = CreateInstance(valType);

                key = BuildFromCom(new CommunicationBase() { Value = parts[0] }, key);
                val = BuildFromCom(new CommunicationBase() { Value = parts[1] }, val);
                DicInstance.Add(key, val);

            }

            return DicInstance;
        }

        public object BuildEnumFromCom<GType>(CommunicationBase com, GType defaultValue)
        {
            var gType = (defaultValue != null ? defaultValue.GetType() : typeof(GType));

            return Enum.Parse(gType, com.Value.ToString());
        }

        public static Dictionary<string, List<PropertyInfo>> CachePropertyInfos { get; set; }

        public static List<PropertyInfo> GetAdaptorProperties(Type intendedType, Type targetType = null)
        {
            if (CachePropertyInfos == null) CachePropertyInfos = new Dictionary<string, List<PropertyInfo>>();

            var key = intendedType.ToString() + (targetType == null ? "" : targetType.ToString());
            if (CachePropertyInfos.Keys.Contains(key))
            {
                return CachePropertyInfos[key];
            }

            if (targetType == null)
            {
                var result = (from x in intendedType.GetProperties()
                              let y = (from z in x.GetCustomAttributes(typeof(IAdaptor), true) where ((IAdaptor)z).Exclusion select z).Count()
                              where y == 0
                              select x).ToList();

                CachePropertyInfos.Add(key, result);

                return result;
            }
            else
            {
                var result = (from x in intendedType.GetProperties()
                              join c in targetType.GetProperties() on x.Name equals c.Name
                              let y = (from z in x.GetCustomAttributes(typeof(IAdaptor), true) where ((IAdaptor)z).Exclusion select z).Count()
                              let y1 = (from z1 in c.GetCustomAttributes(typeof(IAdaptor), true) where ((IAdaptor)z1).Exclusion select z1).Count()

                              where y == 0 && y1 == 0
                              select x).ToList();

                CachePropertyInfos.Add(key, result);

                return result;

            }
        }

        public Guid BuildExclusiveFromCom(ICommunication property, Guid guid)
        {
            throw new NotImplementedException();
        }


    }

    public enum AdaptorSupportTypes
    {
        Exclusive,
        List,
        Dictionary,
        Enum,
        Class
    }
}
