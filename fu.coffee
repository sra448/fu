define (require) ->

  fu = {}

  #+ compose :: Function... -> Function
  fu.compose = (fs...) ->
    lastFuncIndex = fs.length - 1
    (args...) ->
      args = [fu.apply fs[lastFuncIndex - i], args] for __, i in fs
      args[0]

  #+ curry :: Function, xyz... -> Function
  fu.curry = (f, args...) ->
    (moreArgs...) -> f.apply this, (args.concat moreArgs)

  #+ autoCurry :: Function, (Int) -> Function
  fu.autoCurry = (f, numArgs = f.length) ->
    (newArgs...) ->
      if newArgs.length < numArgs
        if numArgs - newArgs.length > 0
          fu.autoCurry (fu.curry.apply this, ([f].concat newArgs)), numArgs - newArgs.length
        else
          fu.curry.apply this, ([f].concat newArgs)
      else
        f.apply this, newArgs

  #+ bind :: Object -> Function -> Function
  fu.bind = fu.autoCurry (c, f) -> f.bind c

  #+ toArray :: a... -> [a]
  fu.toArray = (xs...) -> xs

  #+ first :: [a] -> a
  fu.first = (xs) -> xs?[0]

  #+ last :: [a] -> a
  fu.last = (xs) -> xs?[xs.length - 1]

  #+ rest :: [a] -> [a]
  fu.rest = (xs) -> xs?.splice 1

  #+ push :: a -> [a] -> [a]
  fu.push = (value, xs = []) ->
    xs.push value
    xs

  #+ join :: String -> [a] -> String
  fu.join = fu.autoCurry (delimiter, xs) -> xs.join delimiter

  #+ split :: Regex -> String -> [String]
  fu.split = fu.autoCurry (delimiter, xs) -> xs.split delimiter

  #+ splitWith :: (a -> Bool) -> [a] -> [[a]]
  fu.splitWith = fu.autoCurry (f, xs) ->
    res = []
    for x in xs
      res.push [] if (f x) || res.length == 0
      (_.last res).push x
    res

  #+ map :: (a -> b) -> [a] -> [b]
  fu.map = fu.autoCurry (f, xs) -> (f x for x in xs)

  #+ reduce :: (a -> b -> Int -> b) -> b -> [a]
  fu.reduce = fu.autoCurry (f, init, xs) ->
    init = (f init, x, i) for x, i in xs
    init

  #+ find :: (a -> Int -> Bool) -> [a] -> a
  fu.find = fu.autoCurry (f, xs) -> return x for x, i in xs when f x, i

  #+ findR :: [a] -> (a -> Int -> Bool) -> a
  fu.findR = fu.autoCurry (xs, f) -> return x for x, i in xs when f x, i

  #+ filter :: (a -> Int -> Bool) -> [a] -> [a]
  fu.filter = fu.autoCurry (f, xs) -> (x for x, i in xs when f x, i)

  #+ any :: (a -> Int -> Bool) -> [a] -> Bool
  fu.any = fu.autoCurry (f, xs) ->
    return true if f x for x, i in xs when f x, i
    false

  #+ all :: (a -> Int -> Bool) -> [a] -> Bool
  fu.all = fu.autoCurry (f, xs) -> (fu.filter f, xs).length == xs.length

  #+ contains :: a -> [a] -> Bool
  fu.contains = fu.autoCurry (a, xs) ->
    return true if a == x for x in xs
    false

  #+ pluck :: String -> [Object] -> [a]
  fu.pluck = fu.autoCurry (key, xs) -> (x[key] for x in xs)

  #+ addProperty :: Object -> String -> a -> Object
  fu.addProperty = fu.autoCurry (obj, key, value) ->
    obj[key] = value
    obj

  #+ min :: a -> a -> a
  fu.min = fu.autoCurry (a, b) -> if a > b then b else a

  #+ max :: a -> a -> a
  fu.max = fu.autoCurry (a, b) -> if a > b then a else b

  return fu
