entity Counter:
    name: Id(String)
    value: Int
end

process CounterApp:
    counters: Set(Counter)
    favorites: Set(String)

    def GetCounters():
        counters
    end

    def CreateCounter(name: String):
        counters := counters.append(Counter.new(name, 0))
    end

    def Increment(name: String):
        def findCounter(counter: Counter):
            counter.name.equalsStr(name)
        end

        def updateCounter(counter: Counter):
            Counter.new(counter.name, counter.value + 1)
        end

        counters := counters.update(findCounter, updateCounter)
    end

    def AddFavorite(name: String):
        favorites := favorites.append(name)
    end

    def DeleteFavorite(name: String):
        def findFavorite(favName: String):
            name.equalsStr(favName)
        end

        favorites := favorites.delete(findFavorite)
    end
end
